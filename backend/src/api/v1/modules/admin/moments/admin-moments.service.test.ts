import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getModerationStatsService,
  updateMomentStatusService,
} from "./admin-moments.service";

vi.mock("./admin-moments.repository", () => ({
  listPendingMomentsRepo: vi.fn(),
  updateMomentStatusRepo: vi.fn(),
  getModerationStatsRepo: vi.fn(),
}));

vi.mock("../../../common/repositories/moments.repository", () => ({
  getMomentByIdRepo: vi.fn(),
}));

vi.mock("../../../utils/shareUrl", () => ({
  getShareUrl: (slug: string) => `https://example.com/share/${slug}`,
}));

import {
  getModerationStatsRepo,
  updateMomentStatusRepo,
} from "./admin-moments.repository";
import { getMomentByIdRepo } from "../../../common/repositories/moments.repository";

const mockGetModerationStatsRepo = vi.mocked(getModerationStatsRepo);
const mockUpdateMomentStatusRepo = vi.mocked(updateMomentStatusRepo);
const mockGetMomentByIdRepo = vi.mocked(getMomentByIdRepo);

describe("admin-moments.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getModerationStatsService", () => {
    it("returns stats from repository", async () => {
      const stats = { pending: 1, approved: 10, rejected: 0, total: 11 };
      mockGetModerationStatsRepo.mockResolvedValue(stats);
      const result = await getModerationStatsService();
      expect(result).toEqual(stats);
      expect(mockGetModerationStatsRepo).toHaveBeenCalledOnce();
    });
  });

  describe("updateMomentStatusService", () => {
    it("throws NotFoundError when moment does not exist", async () => {
      mockGetMomentByIdRepo.mockResolvedValue(undefined);
      const { NotFoundError } = await import("../../../abstractions/AppError");
      await expect(
        updateMomentStatusService("non-existent-id", "approved")
      ).rejects.toThrow(NotFoundError);
      expect(mockUpdateMomentStatusRepo).not.toHaveBeenCalled();
    });

    it("calls updateMomentStatusRepo when moment exists", async () => {
      const moment = {
        id: "mom-1",
        userId: "u1",
        slug: "s1",
        imageUrl: "https://x.co/1.jpg",
        caption: "cap",
        status: "pending" as const,
        currentWeek: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        consentGiven: true,
      };
      mockGetMomentByIdRepo.mockResolvedValue(moment);
      mockUpdateMomentStatusRepo.mockResolvedValue({ ...moment, status: "approved" });
      await updateMomentStatusService("mom-1", "approved");
      expect(mockGetMomentByIdRepo).toHaveBeenCalledWith("mom-1");
      expect(mockUpdateMomentStatusRepo).toHaveBeenCalledWith("mom-1", "approved");
    });
  });
});
