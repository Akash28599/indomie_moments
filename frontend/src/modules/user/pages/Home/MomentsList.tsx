import { useListMomentsQuery } from "@/store";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Clock, Sparkles } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import Slider from "react-slick";
import { MomentCard } from "../../../common/components/Card/MomentCard";
import { Decorations } from "@/modules/common/components/Decorations";
import { useState } from "react";

const MomentsList = () => {
  const [filter, setFilter] = useState("Popular");
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

  const FILTERS = [
    { id: "Popular", icon: Flame, color: "text-orange-500" },
    { id: "Latest", icon: Clock, color: "text-blue-500" },
    { id: "Trending", icon: Sparkles, color: "text-purple-500" },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <Decorations />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 tracking-tight uppercase">
            Explore Indomie Moments
          </h2>
          <div className="w-24 h-1.5 bg-[#DF2020] mx-auto rounded-full mb-10" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-sm transition-all duration-300 ${
                  filter === item.id
                    ? "bg-[#DF2020] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <item.icon className={`w-4 h-4 ${filter === item.id ? "text-white" : item.color}`} />
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
             <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-[#DF2020] rounded-full animate-spin"></div>
             </div>
          </div>
        ) : (
          <div className={!isAuthenticated ? "pb-12" : ""}>
             {isAuthenticated ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {topMoments.map((moment) => (
                    <MomentCard key={moment.id} moment={moment} />
                  ))}
                </div>
              ) : (
                <Slider {...sliderSettings}>
                  {topMoments.map((moment) => {
                    const imgSrc =
                      moment.image ||
                      moment.imageUrl ||
                      moment.media?.[0]?.url ||
                      "https://via.placeholder.com/400x400?text=No+Image";

                    return (
                      <div key={moment.id} className="px-4">
                        <Link to="/moments" className="block relative group aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
                          <img
                            src={imgSrc}
                            alt={moment.title || "Indomie Moment"}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                             <p className="text-white font-bold text-lg">{moment.userName}</p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </Slider>
              )}
          </div>
        )}

        {/* View All / Load More Button */}
        <div className="text-center mt-8">
          <Link
            to="/moments"
            className="inline-flex items-center gap-3 bg-white text-gray-900 h-16 px-10 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all border-2 border-gray-100 shadow-sm"
          >
            {isAuthenticated ? "SEE ALL MOMENTS" : "JOIN TO SEE MORE"}
            <ArrowRight className="w-5 h-5 text-[#DF2020]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MomentsList;
