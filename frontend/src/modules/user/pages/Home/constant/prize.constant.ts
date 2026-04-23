import {
  BokChoy,
  Carrot,
  Corn,
  NoodleSwirl,
  SpiceParticles,
} from "../../../../common/components/Ui/NoodleDecorations";

export const PRIZE_DECORATIONS = [
  {
    component: SpiceParticles,
    className: "absolute inset-0 w-full h-full opacity-40",
  },
  {
    component: NoodleSwirl,
    className: "absolute top-10 left-10 w-24 h-24 opacity-20",
  },
  {
    component: NoodleSwirl,
    className: "absolute bottom-10 right-10 w-32 h-32 opacity-20 rotate-180",
  },
  {
    component: Carrot,
    className: "absolute top-16 right-[20%] w-16 h-16 opacity-25 rotate-[-25deg]",
  },
  {
    component: BokChoy,
    className: "absolute bottom-20 left-[18%] w-20 h-20 opacity-25 rotate-12",
  },
  {
    component: Corn,
    className: "absolute top-24 left-[15%] w-14 h-14 opacity-25 -rotate-6",
  },
];

export const PRIZE_HEADER = {
  title: "GRAND PRIZES TO BE WON",
  subtitle: "Weekly rewards for our most creative fans!",
  footerNote: "Next winner announced this Sunday!",
};

export const PRIZE_PRIZES = [
  {
    rank: "💰",
    rankColor: "text-green-500",
    title: "Weekly Cash Rewards",
    amount: "1,000,000",
    tag: "UP TO 1M",
    bonus: "Direct bank transfer to top 10 winners",
  },
  {
    rank: "📱",
    rankColor: "text-blue-500",
    title: "Latest Tech Gadgets",
    amount: "LATEST TECH",
    tag: "GADGETS",
    bonus: "Smartphones, Tablets & Wearables",
  },
  {
    rank: "👩‍🍳",
    rankColor: "text-orange-500",
    title: "Kitchen Makeovers",
    amount: "FULL SET",
    tag: "LIFESTYLE",
    bonus: "Complete Indomie branded kitchen sets",
  },
];
