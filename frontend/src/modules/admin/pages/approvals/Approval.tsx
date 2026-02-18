import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ApprovalStatCard from '../common/ApprovalStatCard';
import {
  useGetPendingMomentsQuery,
  useGetModerationStatsQuery,
  useUpdateMomentStatusMutation,
} from '@/store';
import { env } from '@/config/env';

const Approval = () => {
  const { data: pendingMoments = [], isLoading: loadingMoments } = useGetPendingMomentsQuery();
  const { data: stats, isLoading: loadingStats } = useGetModerationStatsQuery();
  const [updateStatus, { isLoading: actionLoading }] = useUpdateMomentStatusMutation();
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [expandedCaptions, setExpandedCaptions] = useState<Set<string>>(new Set());

  const handleApprove = async (momentId: string) => {
    setActioningId(momentId);
    try {
      await updateStatus({ id: momentId, status: 'approved' }).unwrap();
      setShowToast({ message: 'Moment approved successfully!', type: 'success' });
    } catch {
      setShowToast({ message: 'Failed to approve moment', type: 'error' });
    } finally {
      setActioningId(null);
      setTimeout(() => setShowToast(null), 3000);
    }
  };

  const handleReject = async (momentId: string) => {
    setActioningId(momentId);
    try {
      await updateStatus({ id: momentId, status: 'rejected' }).unwrap();
      setShowToast({ message: 'Moment rejected', type: 'success' });
    } catch {
      setShowToast({ message: 'Failed to reject moment', type: 'error' });
    } finally {
      setActioningId(null);
      setTimeout(() => setShowToast(null), 3000);
    }
  };

  const displayStats = {
    pending: stats?.pending ?? 0,
    approved: stats?.approved ?? 0,
    rejected: stats?.rejected ?? 0,
    total: stats?.total ?? 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Content Approvals</h1>
        <p className="text-gray-600 mt-1">Review and moderate user-submitted Indomie Moments</p>
      </div>

      {loadingStats ? (
        <div className="h-32 bg-gray-100 rounded-2xl animate-pulse mb-8" />
      ) : (
        <ApprovalStatCard
          pending={displayStats.pending}
          approved={displayStats.approved}
          rejected={displayStats.rejected}
          total={displayStats.total}
        />
      )}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <AccessTimeIcon className="text-blue-600" />
          Pending Moments for Review
        </h2>

        {loadingMoments ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-gray-200 rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="flex gap-3 mt-4">
                    <div className="h-10 flex-1 bg-gray-200 rounded-full" />
                    <div className="h-10 flex-1 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : pendingMoments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No pending moments to review at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingMoments.map((moment) => {
              const uploadDate = new Date(moment.createdAt).toLocaleString('en-NG', {
                timeZone: env.VITE_APP_TIMEZONE || 'Africa/Lagos',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              const isActioning = actioningId === moment.id;

              return (
                <div
                  key={moment.id}
                  className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={moment.imageUrl}
                      alt={moment.caption}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="p-5 flex flex-col">
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <PersonIcon fontSize="small" />
                        <span className="font-bold text-sm">{moment.userName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <CalendarTodayIcon sx={{ fontSize: 14 }} />
                        <span>{uploadDate}</span>
                      </div>
                    </div>

                    <div className="mb-4 flex-grow min-h-13">
                      <h4 className="text-xs font-bold text-gray-700 mb-1">Caption:</h4>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {expandedCaptions.has(moment.id) ? (
                          <>
                            {moment.caption}{' '}
                            <button
                              onClick={() => setExpandedCaptions((prev) => { const next = new Set(prev); next.delete(moment.id); return next; })}
                              className="text-blue-500 text-xs font-semibold hover:underline"
                            >
                              See less
                            </button>
                          </>
                        ) : moment.caption.length > 100 ? (
                          <>
                            {moment.caption.slice(0, 80)}...{' '}
                            <button
                              onClick={() => setExpandedCaptions((prev) => { const next = new Set(prev); next.add(moment.id); return next; })}
                              className="text-blue-500 text-xs font-semibold hover:underline"
                            >
                              See more...
                            </button>
                          </>
                        ) : (
                          moment.caption
                        )}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(moment.id)}
                        disabled={isActioning || actionLoading}
                        className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white px-4 py-2.5 rounded-full text-sm font-bold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isActioning ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <CheckCircleIcon fontSize="small" />
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(moment.id)}
                        disabled={isActioning || actionLoading}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white px-4 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isActioning ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <CancelIcon fontSize="small" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showToast && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-full shadow-2xl z-50 ${
            showToast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            {showToast.type === 'success' ? (
              <CheckCircleIcon fontSize="small" />
            ) : (
              <CancelIcon fontSize="small" />
            )}
            {showToast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Approval;
