import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";

export interface StatCardStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

interface StatCardProps {
  stats: StatCardStats;
  totalUsers?: number;
}

const CARDS = [
  {
    title: "Pending",
    valueKey: "pending" as const,
    description: "Awaiting Review",
    icon: AccessTimeIcon,
    borderColor: "border-blue-500",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
  },
  {
    title: "Approved",
    valueKey: "approved" as const,
    description: "Live Moments",
    icon: BarChartIcon,
    borderColor: "border-green-500",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    badgeBg: "bg-green-50",
    badgeText: "text-green-600",
  },
  {
    title: "Rejected",
    valueKey: "rejected" as const,
    description: "Declined",
    icon: TrendingUpIcon,
    borderColor: "border-red-500",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    badgeBg: "bg-red-50",
    badgeText: "text-red-600",
  },
  // {
  //   title: "Users",
  //   valueKey: "users" as const,
  //   description: "Registered",
  //   icon: PeopleIcon,
  //   borderColor: "border-purple-500",
  //   bgColor: "bg-purple-100",
  //   iconColor: "text-purple-600",
  //   badgeBg: "bg-purple-50",
  //   badgeText: "text-purple-600",
  // },
];

const StatCard = ({ stats, totalUsers = 0 }: StatCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {CARDS.map((card) => {
        const IconComponent = card.icon;
        const value =
          card.valueKey === "users" ? totalUsers : stats[card.valueKey];
        return (
          <div
            key={card.title}
            className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${card.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}
              >
                <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <span
                className={`text-sm font-semibold ${card.badgeText} ${card.badgeBg} px-3 py-1 rounded-full`}
              >
                {card.title}
              </span>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">
              {value}
            </div>
            <p className="text-sm text-gray-600">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatCard;
