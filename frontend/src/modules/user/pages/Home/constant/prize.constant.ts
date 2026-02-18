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
  title: "🎁 Amazing Prizes Await!",
  subtitle: "Fresh winners crowned every Sunday!",
  footerNote: "Leaderboard resets every Sunday at 11:59 PM",
};

export const PRIZE_PRIZES = [
  {
    rank: "1st",
    rankColor: "text-[#FFD700]",
    title: "Grand Prize",
    amount: "1,000,000",
    bonus: "+ 1 Year Supply of Indomie",
  },
  {
    rank: "2nd",
    rankColor: "text-gray-400",
    title: "Second Prize",
    amount: "500,000",
    bonus: "+ 6 Month Supply of Indomie",
  },
  {
    rank: "3rd",
    rankColor: "text-orange-600",
    title: "Third Prize",
    amount: "250,000",
    bonus: "+ 3 Month Supply of Indomie",
  },
];
