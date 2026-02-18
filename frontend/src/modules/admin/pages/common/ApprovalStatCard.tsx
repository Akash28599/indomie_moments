import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface ApprovalStatCardProps {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

const ApprovalStatCard = ({ pending, approved, rejected, total }: ApprovalStatCardProps) => {
  const stats = [
    {
      title: 'Pending',
      value: pending,
      icon: AccessTimeIcon,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-400',
    },
    {
      title: 'Approved',
      value: approved,
      icon: CheckCircleOutlineIcon,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      borderColor: 'border-green-500',
    },
    {
      title: 'Rejected',
      value: rejected,
      icon: CancelOutlinedIcon,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      borderColor: 'border-red-500',
    },
    {
      title: 'Total',
      value: total,
      icon: ScheduleIcon,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-500',
      borderColor: 'border-gray-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${card.borderColor}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${card.iconBg} rounded-full flex items-center justify-center`}>
                <IconComponent className={`${card.iconColor}`} fontSize="small" />
              </div>
              <span className="text-gray-600 font-medium">{card.title}</span>
            </div>
            <div className={`text-3xl font-black ${card.title === 'Total' ? 'text-gray-900' : card.iconColor}`}>
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApprovalStatCard;
