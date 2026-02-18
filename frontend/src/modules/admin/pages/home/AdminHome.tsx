import { Link } from 'react-router';
import ShieldIcon from '@mui/icons-material/Shield';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useAppSelector, selectAdmin, useGetModerationStatsQuery } from '@/store';
import StatCard from "../../../common/components/Card/statCard";

const AdminHome = () => {
  const admin = useAppSelector(selectAdmin);
  const user = admin;
  const { data: statsData } = useGetModerationStatsQuery();
  const stats = {
    pending: statsData?.pending ?? 0,
    approved: statsData?.approved ?? 0,
    rejected: statsData?.rejected ?? 0,
    total: statsData?.total ?? 0,
  };


  // Action cards configuration
  const actionCards = [
    {
      type: 'link',
      to: '/admin/approvals',
      title: 'Review Submissions',
      description: 'Moderate pending moments',
      icon: AssignmentTurnedInIcon,
      gradient: 'bg-gradient-to-r from-[#E2231A] to-[#c41e16]',
      showPendingBadge: true,
      pendingCount: stats.pending,
    },
    {
      type: 'card',
      title: 'Total Submissions',
      description: 'All time statistics',
      icon: BarChartIcon,
      value: stats.total,
      bgColor: 'bg-white',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
    },
  ];

  // Banner badges configuration
  const bannerBadges = [
    { icon: '🎯', text: 'Quality Content' },
    { icon: '🛡️', text: 'Safe Community' },
    { icon: '⚡', text: 'Fast Response' },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Welcome back, {user?.fullName || 'Admin'}!
          </h1>
          <p className="text-xl text-gray-600">
            Manage and moderate Indomie Moments submissions
          </p>
        </div>
        <StatCard stats={stats} />


        {/* Quick Actions - Mapped */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {actionCards.map((card, index) => {
            const IconComponent = card.icon;

            if (card.type === 'link') {
              return (
                <Link
                  key={index}
                  to={card.to!}
                  className={`${card.gradient} rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1">{card.title}</h3>
                      <p className="text-white/80">{card.description}</p>
                    </div>
                  </div>
                  {card.showPendingBadge && card.pendingCount && card.pendingCount > 0 && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">
                        {card.pendingCount} moment{card.pendingCount !== 1 ? 's' : ''} waiting
                      </span>
                    </div>
                  )}
                </Link>
              );
            }

            return (
              <div
                key={index}
                className={`${card.bgColor} rounded-3xl shadow-xl p-8 border border-gray-200`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
                <div className="text-5xl font-black text-gray-900">{card.value}</div>
              </div>
            );
          })}
        </div>

        {/* System Info */}
        {/* <div className="bg-gray-900 rounded-3xl shadow-xl p-8 text-white mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2">Indomie Moments</h3>
              <p className="text-gray-300 mb-4">
                Content Moderation System
              </p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Platform:</span>
                  <span className="ml-2 font-semibold">Promotional Microsite</span>
                </div>
                <div>
                  <span className="text-gray-400">Version:</span>
                  <span className="ml-2 font-semibold">1.0.0</span>
                </div>
              </div>
            </div>
            <div className="w-20 h-20 bg-[#E2231A] rounded-2xl flex items-center justify-center">
              <ShieldIcon sx={{ fontSize: 40, color: 'white' }} />
            </div>
          </div>
        </div> */}

        {/* Colorful Indomie Banner */}
        {/* <div className="relative bg-gradient-to-r from-[#FFD700] via-yellow-400 to-[#FFD700] rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#E2231A] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Keep Indomie Moments Amazing! 🍜
              </h3>
              <p className="text-lg text-gray-800 mb-6">
                Every moderation decision helps create a safe, fun, and engaging community for Indomie lovers across Indonesia. Thank you for your dedication!
              </p>
              <div className="flex flex-wrap gap-4">
                {bannerBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-white/50 backdrop-blur-sm rounded-full px-5 py-2 inline-flex items-center gap-2"
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <span className="font-bold text-gray-900">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminHome;
