import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Calendar,
  Heart,
  Upload as UploadIcon,
  Trophy,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../../../hooks/useAuth";
import { useListMyMomentsQuery } from "../../../../store";
import {
  FloatingNoodle,
  NoodleBowl,
  ChiliPepper,
  NoodleSwirl,
} from "../../../common/components/Ui/NoodleDecorations";
import { formatDateWAT } from "../../../../lib/date";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const { data: moments = [], isLoading, isError } = useListMyMomentsQuery();

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    navigate("/register");
    return null;
  }

  const {
    userMoments,
    approvedMoments,
    pendingMoments,
    rejectedMoments,
    totalLikes,
  } = useMemo(() => {
    const approvedMoments = moments.filter((m) => m.status === "approved");
    const pendingMoments = moments.filter((m) => m.status === "pending");
    const rejectedMoments = moments.filter((m) => m.status === "rejected");
    const totalLikes = moments.reduce((sum, m) => sum + (m.likes ?? 0), 0);

    return {
      userMoments: moments,
      approvedMoments,
      pendingMoments,
      rejectedMoments,
      totalLikes,
    };
  }, [moments]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const joinDate = (user as any)?.createdAt
    ? formatDateWAT((user as any).createdAt)
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 relative overflow-hidden">
      {/* Decorative Noodles */}
      <FloatingNoodle
        className="absolute top-10 left-[5%] w-20 h-20 opacity-15 animate-float"
        delay={0}
      />
      <FloatingNoodle
        className="absolute bottom-20 right-[8%] w-16 h-16 opacity-15 animate-float"
        delay={1.5}
      />
      <NoodleBowl className="absolute top-[40%] right-[3%] w-32 h-32 opacity-10 rotate-12" />
      <ChiliPepper className="absolute bottom-32 left-[10%] w-14 h-14 opacity-20 -rotate-45 animate-bounce-slow" />
      <NoodleSwirl className="absolute top-[60%] left-[5%] w-24 h-24 opacity-10 animate-spin-slow" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#E2231A] to-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">
                  {(user as any)?.fullName ??
                    (user as any)?.name ??
                    "Indomie Fan"}
                </h1>
                {/* Phone intentionally hidden from public UI */}
                {joinDate && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {joinDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-semibold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center text-center w-full">
              <div className="flex-1">
                <div className="text-4xl font-black text-[#E2231A]">
                  {userMoments.length}
                </div>
                <div className="text-sm text-gray-600 font-semibold mt-1">
                  Moments
                </div>
              </div>

              <div className="flex-1">
                <div className="text-4xl font-black text-green-600">
                  {approvedMoments.length}
                </div>
                <div className="text-sm text-gray-600 font-semibold mt-1">
                  Approved
                </div>
              </div>

              <div className="flex-1">
                <div className="text-4xl font-black text-[#FFD700]">
                  {totalLikes.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 font-semibold mt-1">
                  Total Likes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload New Moment CTA */}
        <Link
          to="/upload"
          className="block bg-gradient-to-r from-[#E2231A] to-[#c41e16] text-white rounded-3xl shadow-xl p-6 mb-8 hover:shadow-2xl transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                <UploadIcon className="w-7 h-7" />
                Share Your Indomie Moment
              </h3>
              <p className="text-white/90">
                Upload a new moment and get more likes to win prizes! 🏆
              </p>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">
              🍜
            </div>
          </div>
        </Link>

        {/* Pending/Rejected Notifications */}
        {pendingMoments.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">⏱️</span>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">
                  {pendingMoments.length} Moment
                  {pendingMoments.length > 1 ? "s" : ""} Under Review
                </h4>
                <p className="text-sm text-blue-800">
                  Your moments are being reviewed by our team. This usually
                  takes 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {rejectedMoments.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <div>
                <h4 className="font-bold text-red-900 mb-1">
                  {rejectedMoments.length} Moment
                  {rejectedMoments.length > 1 ? "s" : ""} Not Approved
                </h4>
                <p className="text-sm text-red-800">
                  Some moments didn't meet our community guidelines. Please
                  review and upload new content.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* My Moments Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#FFD700]" />
            My Indomie Moments
          </h2>

          {isLoading ? (
            <div className="text-center py-12 text-gray-600">
              Loading your moments...
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-600">
              Failed to load your moments. Please try again later.
            </div>
          ) : userMoments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍜</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No moments yet!
              </h3>
              <p className="text-gray-600 mb-6">
                Share your first Indomie moment and start collecting likes!
              </p>
              <Link
                to="/upload"
                className="inline-block bg-[#E2231A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#c41e16] transition-colors"
              >
                Upload Your First Moment
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userMoments.map((moment) => (
                <div key={moment.id} className="group relative">
                  <Link
                    to={`/share/${moment.slug ?? moment.id}`}
                    className="block relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={moment.imageUrl}
                      alt={moment.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      {moment.status === "approved" && (
                        <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          ✓ Live
                        </div>
                      )}
                      {moment.status === "pending" && (
                        <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          ⏱ Pending
                        </div>
                      )}
                      {moment.status === "rejected" && (
                        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          ✗ Rejected
                        </div>
                      )}
                    </div>

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-semibold line-clamp-2 text-sm mb-2">
                        {moment.caption}
                      </p>
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 fill-current" />
                          <span className="font-bold">
                            {moment.likes.toLocaleString()}
                          </span>
                        </div>
                        {/* <span className="bg-white/20 px-2 py-1 rounded-full">
                          Week {moment.weekNumber}
                        </span> */}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
