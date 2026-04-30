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
    // Navigate first to avoid re-render crash on protected page
    navigate("/", { replace: true });
    await logout();
  };

  const joinDate = user?.createdAt
    ? formatDateWAT(user.createdAt)
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
                  {user?.fullName ?? "Indomie Fan"}
                </h1>
                {joinDate && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {joinDate}</span>
                  </div>
                )}
                
                {/* Share Links */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Share Profile:</span>
                  <a href={`https://wa.me/?text=Check out my Indomie Moments! ${window.location.origin}/profile`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors" title="Share to WhatsApp">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </a>
                  <a href={`https://www.tiktok.com/share?url=${window.location.origin}/profile`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors" title="Share to TikTok">
                     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.32 6.32 0 006.33 6.32 6.32 6.32 6.32 6.32 6.32 6.32 6.32-6.32V8.58a8.17 8.17 0 004.34 1.36V6.52a5 5 0 01-2.41-.83z"/></svg>
                  </a>
                  <button onClick={() => { navigator.clipboard.writeText(window.location.origin + '/profile'); alert('Link copied!'); }} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors" title="Copy Link">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  </button>
                </div>
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
          to="/#upload"
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
                to="/#upload"
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
                            {moment.likes?.toLocaleString() || 0}
                          </span>
                        </div>
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
