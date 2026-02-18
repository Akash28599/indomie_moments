import { useState, useCallback } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Heart, Share2, ArrowLeft, Calendar, X as CloseIcon } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetMomentBySlugQuery, useToggleLikeMutation } from "../../../../store";
import {
  FloatingNoodle,
  NoodleBowl,
  ChiliPepper,
  NoodleSwirl,
} from "../../../common/components/Ui/NoodleDecorations";
import { formatDateWAT } from "../../../../lib/date";

export const SharePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const {
    data: moment,
    isLoading,
    isError,
  } = useGetMomentBySlugQuery(slug ?? "", { skip: !slug });

  const [toggleLike] = useToggleLikeMutation();
  const [showShareToast, setShowShareToast] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const returnUrl = encodeURIComponent(location.pathname + location.search);

  const requireAuth = (onAuthed: () => void) => {
    if (!isAuthenticated) {
      navigate(`/register?returnUrl=${returnUrl}`);
      return;
    }
    onAuthed();
  };

  const handleLike = () => {
    if (!moment) return;

    requireAuth(async () => {
      try {
        await toggleLike(moment.id).unwrap();
        // Optimistic UI is handled by RTK Query invalidation; no local state here.
      } catch (error) {
        console.error("Failed to like moment", error);
      }
    });
  };

  const openShareDialog = () => {
    setIsShareDialogOpen(true);
  };

  const copyToClipboard = (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const shareToX = useCallback(() => {
    if (!currentUrl) return;

    const tweetText = encodeURIComponent("Check out my Indomie Moment!");
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${tweetText}`;

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = url;
    }
  }, [currentUrl]);

  const shareFacebook = useCallback(() => {
    if (!currentUrl) return;

    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = url;
    }
  }, [currentUrl]);

  const shareInstagram = useCallback(() => {
    if (!currentUrl) return;
    copyToClipboard(currentUrl);
  }, [currentUrl]);

  const shareWhatsApp = useCallback(() => {
    if (!currentUrl) return;
    const text = encodeURIComponent(`Check out this Indomie Moment! ${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }, [currentUrl]);

  const shareTelegram = useCallback(() => {
    if (!currentUrl) return;
    const text = encodeURIComponent("Check out this Indomie Moment!");
    const url = encodeURIComponent(currentUrl);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  }, [currentUrl]);

  const handleCopyLink = useCallback(() => {
    if (!currentUrl) return;
    copyToClipboard(currentUrl);
  }, [currentUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading moment...</p>
      </div>
    );
  }

  if (isError || !moment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Moment Not Found</h2>
          <p className="text-gray-600 mb-8">
            This Indomie moment doesn't exist or has been removed.
          </p>
          <Link
            to="/moments"
            className="inline-block bg-[#E2231A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#c41e16] transition-colors"
          >
            Browse All Moments
          </Link>
        </div>
      </div>
    );
  }

  const uploadDate = formatDateWAT(moment.uploadedAt);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${moment.imageUrl}')`,
            filter: "blur(40px)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-gray-50/95" />
      </div>

      {/* Decorative Noodles */}
      <FloatingNoodle className="absolute top-20 left-[5%] w-20 h-20 opacity-15 animate-float z-[1]" delay={0} />
      <FloatingNoodle className="absolute bottom-32 right-[8%] w-16 h-16 opacity-15 animate-float z-[1]" delay={1.5} />
      <NoodleBowl className="absolute top-[40%] right-[3%] w-32 h-32 opacity-10 rotate-12 z-[1]" />
      <ChiliPepper className="absolute bottom-20 left-[10%] w-14 h-14 opacity-20 -rotate-45 animate-bounce-slow z-[1]" />
      <NoodleSwirl className="absolute top-[60%] left-[5%] w-24 h-24 opacity-10 animate-spin-slow z-[1]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#E2231A] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
            <img
              src={moment.imageUrl}
              alt={moment.caption}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col">
            {/* User Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{moment.userName}</h2>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{uploadDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mb-6 flex-grow">
              <p className="text-lg text-gray-800 leading-relaxed">{moment.caption}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  moment.isLiked
                    ? "bg-[#E2231A] text-white hover:bg-[#c41e16]"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-6 h-6 ${moment.isLiked ? "fill-current" : ""}`} />
                <span>{moment.isLiked ? "Liked" : "Like"}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {moment.likes.toLocaleString()}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={openShareDialog}
                className="w-full py-4 rounded-full font-bold text-lg bg-[#FFD700] text-gray-900 hover:bg-yellow-300 transition-all flex items-center justify-center gap-3"
              >
                <Share2 className="w-6 h-6" />
                Share This Moment
              </button>

              {!isAuthenticated && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-800 mb-3">
                    Like this moment? Register to vote and upload your own!
                  </p>
                  <Link
                    to={`/register?returnUrl=${returnUrl}`}
                    className="inline-block bg-[#E2231A] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#c41e16] transition-colors"
                  >
                    Register Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {isShareDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setIsShareDialogOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Share this moment</h3>
            <p className="text-sm text-gray-600 mb-6">
              Show off this Indomie moment to your friends!
            </p>
            <div className="space-y-3">
              <button
                onClick={shareWhatsApp}
                className="w-full py-3 rounded-full font-semibold bg-[#25D366] text-white hover:bg-[#1da851] transition-colors"
              >
                Share on WhatsApp
              </button>
              <button
                onClick={shareToX}
                className="w-full py-3 rounded-full font-semibold bg-black text-white hover:bg-gray-900 transition-colors"
              >
                Share on X (Twitter)
              </button>
              <button
                onClick={shareFacebook}
                className="w-full py-3 rounded-full font-semibold bg-[#1877F2] text-white hover:bg-[#145cc0] transition-colors"
              >
                Share on Facebook
              </button>
              <button
                onClick={shareTelegram}
                className="w-full py-3 rounded-full font-semibold bg-[#0088cc] text-white hover:bg-[#006da3] transition-colors"
              >
                Share on Telegram
              </button>
              <button
                onClick={shareInstagram}
                className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] to-[#cc2366] text-white transition-colors"
              >
                Copy link for Instagram
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full py-3 rounded-full font-semibold bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg">
          ✓ Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

