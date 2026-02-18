import type { FilterType } from "../types/moments";


export const FILTER_TYPES: Record<string, FilterType> = {
  ALL: 'all',
  THIS_WEEK: 'thisWeek',
};

export const FILTER_BUTTONS: {
  key: FilterType;
  label: string;
  activeClass: string;
  showTrendingIcon?: boolean;
}[] = [
  {
    key: 'all',
    label: 'All Moments',
    activeClass: 'bg-[#E2231A] text-white',
  },
  {
    key: 'thisWeek',
    label: "This Week's Top",
    activeClass: 'bg-[#FFD700] text-gray-900',
    showTrendingIcon: true,
  },
];

export const MASONRY_BREAKPOINTS: Record<number, number> = {
  350: 1,
  640: 2,
  1024: 3,
};

export const PAGE_CONTENT = {
  title: 'Indomie Moments',
  subtitle: 'Discover and like the best Indomie moments from our community',
  ctaTitle: 'Got an Amazing Indomie Moment?',
  ctaSubtitle: "Share it now and compete for this week's prizes!",
  ctaButton: 'Upload Your Moment',
  ctaLink: '/upload',
};
