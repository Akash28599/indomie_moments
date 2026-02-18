import ExcelJS from 'exceljs';
import { getUsersRepo, getUsersForExportRepo } from './registrations.repository';
import { getUserAnalyticsRepo, getUserAnalyticsForExportRepo } from './analytics.repository';
import { config } from '../../../../../config/env';

export async function getUsersService(page: number, limit: number, search?: string, campaignId?: string) {
  const offset = (page - 1) * limit;
  const { users, total } = await getUsersRepo(
    limit,
    offset,
    search,
    campaignId
  );
  return {
    users,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function buildExportStreamService(search?: string, campaignId?: string) {
  const rows = await getUsersForExportRepo(search, campaignId);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Users');
  worksheet.columns = [
    { header: 'Phone Number', key: 'phoneNumber', width: 15 },
    { header: 'Name', key: 'fullName', width: 25 },
    { header: 'Campaign', key: 'campaign', width: 30 },
    { header: 'Date & Time', key: 'registeredAt', width: 20 },
  ];
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' },
  };
  for (const row of rows) {
    worksheet.addRow({
      phoneNumber: row.user.phoneNumber,
      fullName: row.user.fullName,
      campaign: row.campaign?.name ?? '',
      createdAt: row.user.createdAt ? new Date(row.user.createdAt).toLocaleString('en-NG', { timeZone: config.timezone }) : '',
    });
  }
  return workbook;
}

export async function getUserAnalyticsService(page: number, limit: number, search?: string) {
  const offset = (page - 1) * limit;
  const { users, total } = await getUserAnalyticsRepo(limit, offset, search);
  return {
    users,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function buildAnalyticsExportService(search?: string) {
  const rows = await getUserAnalyticsForExportRepo(search);

  // Build CSV string
  const headers = [
    "Full Name",
    "Phone Number",
    "Campaign",
    "Total Posts",
    "Approved Posts",
    "Pending Posts",
    "Total Likes",
    "Registered At",
  ];

  const csvRows = [headers.join(",")];
  for (const row of rows) {
    const registeredAt = row.registeredAt
      ? new Date(row.registeredAt).toLocaleString("en-NG", { timeZone: config.timezone })
      : "";
    csvRows.push(
      [
        escapeCsvField(row.fullName ?? ""),
        escapeCsvField(row.phoneNumber),
        escapeCsvField(row.campaignName ?? ""),
        row.totalPosts,
        row.approvedPosts,
        row.pendingPosts,
        row.totalLikes,
        escapeCsvField(registeredAt),
      ].join(",")
    );
  }

  return csvRows.join("\n");
}

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
