import { useState, useCallback } from "react";
import { useListMomentsQuery } from "@/store";
import type { MomentListItem } from "../../../../services/types";
import type { FilterType } from "./types/moments";
import {
  FILTER_TYPES,
  PAGE_CONTENT,
} from "./constant/moments.constants";
import { Decorations } from "../../../common/components/Decorations";
import { FilterBar } from "./FilterBar";
import { MomentCard } from "../../../common/components/Card/MomentCard";
import { CTASection } from "./CTASection";

const PAGE_SIZE = 20;

export const Moments: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>(FILTER_TYPES.ALL);
  const [loadedPages, setLoadedPages] = useState(1);

  const currentWeekArg = filter === FILTER_TYPES.THIS_WEEK ? true : undefined;

  // Fetch current page
  const { data, isLoading, isFetching } = useListMomentsQuery({
    currentWeek: currentWeekArg,
    limit: PAGE_SIZE * loadedPages,
    offset: 0,
  });

  const moments = data?.items ?? [];
  const totalCount = data?.meta?.totalCount ?? 0;
  const hasMore = moments.length < totalCount;

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
    setLoadedPages(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setLoadedPages((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 relative overflow-hidden">
      <Decorations />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            <span className="text-[#E2231A]">Indomie</span>{" "}
            {PAGE_CONTENT.title.replace("Indomie ", "")}
          </h1>
          <p className="text-xl text-gray-600">{PAGE_CONTENT.subtitle}</p>
        </div>

        <FilterBar active={filter} onChange={handleFilterChange} />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : moments.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {moments.map((moment: MomentListItem) => (
                <MomentCard key={moment.id} moment={moment} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mb-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="bg-[#E2231A] hover:bg-[#c41e16] text-white px-8 py-3 rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFetching ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Load More"
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Showing {moments.length} of {totalCount} moments
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No moments found
            </h3>
            <p className="text-gray-600">
              Be the first to share your Indomie moment!
            </p>
          </div>
        )}

        <CTASection />
      </div>
    </div>
  );
};
