import {
  Cabbage,
  ChiliPepper,
  Egg,
  GreenOnion,
  Mushroom,
  NoodleBowl,
  SteamingBowl,
} from "../../../../common/components/Ui/NoodleDecorations";


export const HOW_WORKS_DECORATIONS = [
  {
    component: NoodleBowl,
    className: "absolute top-10 right-10 w-32 h-32 opacity-10 rotate-12",
  },
  {
    component: SteamingBowl,
    className: "absolute bottom-10 left-10 w-40 h-40 opacity-10 -rotate-12",
  },
  {
    component: GreenOnion,
    className: "absolute top-20 left-[5%] w-16 h-16 opacity-15 rotate-[-15deg]",
  },
  {
    component: Mushroom,
    className: "absolute top-32 right-[8%] w-20 h-20 opacity-15 rotate-12",
  },
  {
    component: Egg,
    className: "absolute bottom-24 right-[15%] w-16 h-16 opacity-15 -rotate-6",
  },
  {
    component: Cabbage,
    className: "absolute bottom-32 left-[12%] w-18 h-18 opacity-15 rotate-[20deg]",
  },
];

export const HOW_WORKS_STEPS = [
  {
    step: 1,
    title: "Sign Up",
    description: "Quick registration with your phone number",
    highlight: false,
  },
  {
    step: 2,
    title: "Snap & Share",
    description: "Show us your best Indomie creation!",
    highlight: false,
  },
  {
    step: 3,
    title: "Collect Likes",
    description: "Get love from the Indomie community",
    highlight: false,
  },
  {
    step: 4,
    title: "Win Big!",
    description: "Top posts win awesome prizes weekly",
    highlight: true,
    icon: ChiliPepper,
  },
];
