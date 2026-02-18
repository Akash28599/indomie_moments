import {
  Egg,
  FloatingNoodle,
  GreenOnion,
  Mushroom,
} from "../../../common/components/Ui/NoodleDecorations";
import { useListMomentsQuery } from "@/store";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import Slider from "react-slick";
import { MomentCard } from "../../../common/components/Card/MomentCard";
import { Decorations } from "@/modules/common/components/Decorations";

const MomentsList = () => {
  const { data, isLoading } = useListMomentsQuery({
    limit: 6,
    offset: 0,
  });

  const { isAuthenticated } = useAuth();

  const topMoments = (data?.items ?? []).slice(0, 6);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-gray-100 relative overflow-hidden">
      <Decorations />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Top Indomie Moments
          </h2>
          <p className="text-xl text-gray-600">
            This week's most loved moments
          </p>
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="h-[350px] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#E2231A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : isAuthenticated ? (
          // Authenticated → Grid of MomentCards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {topMoments.map((moment) => (
              <MomentCard key={moment.id} moment={moment} />
            ))}
          </div>
        ) : (
          // Not authenticated → Slider with images
          <Slider {...sliderSettings}>
            {topMoments.map((moment) => {
              const imgSrc =
                moment.image ||
                moment.imageUrl ||
                moment.media?.[0]?.url ||
                "https://via.placeholder.com/400x400?text=No+Image";

              return (
                <div key={moment.id} className="px-3">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={imgSrc}
                      alt={moment.title || "Indomie Moment"}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        )}

        {/* View All Button */}
        {isAuthenticated && (
          <>
            <div className="text-center mt-12">
              <Link
                to="/moments"
                className="inline-flex items-center gap-2 bg-[#E2231A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#c41e16] transition-colors"
              >
                View All Moments
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MomentsList;
