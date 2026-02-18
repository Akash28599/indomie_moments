import { Heart } from "lucide-react";
import { Link } from "react-router";
import type { MomentListItem } from "../../../../services/types";
import { useAuth } from "../../../../hooks/useAuth";
import { useToggleLikeMutation } from "../../../../store";

interface MomentCardProps {
  moment: MomentListItem;
  isLiked?: boolean;
}

export const MomentCard = ({
  moment,
  isLiked: isLikedProp,
}: MomentCardProps) => {
  const { isAuthenticated } = useAuth();
  const [toggleLike] = useToggleLikeMutation();

  const isLiked = isLikedProp ?? moment.isLiked ?? false;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = '/register';
      return;
    }

    try {
      await toggleLike(moment.id).unwrap();
    } catch {
      // handled by RTK Query cache invalidation
    }
  };

  const sharePath = moment.slug ? `/share/${moment.slug}` : `/share/${moment.id}`;

  return (
   <Link to={sharePath} className="block group">
  <div className="bg-white rounded-lg overflow-hidden h-[500px] flex flex-col shadow-md hover:shadow-xl transition-shadow">

    {/* IMAGE */}
    <div className="relative h-[380px] overflow-hidden">
      <img
        src={moment.imageUrl}
        alt={moment.caption}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {moment.status === 'pending' && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
          Under Review
        </div>
      )}

      {moment.status === 'rejected' && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
          Rejected
        </div>
      )}
    </div>

    {/* CONTENT */}
    <div className="p-4 flex flex-col flex-1">

      {/* Caption */}
      <p className="text-gray-800 line-clamp-2 min-h-[48px]">
        {moment.caption}
      </p>

      {/* Bottom section always stays at bottom */}
      <div className="flex items-center justify-between mt-auto pt-3">
        <span className="text-sm text-gray-600">
          by {moment.userName}
        </span>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${
            isLiked
              ? 'text-[#E2231A]'
              : 'text-gray-600 hover:text-[#E2231A]'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="font-semibold">
            {moment.likes.toLocaleString()}
          </span>
        </button>
      </div>
    </div>
  </div>
</Link>

  );
};
