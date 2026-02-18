import { cup, heroBackdrop, pord } from "../../../../../assets";

export const BENTO_IMAGES = [
  {
    src:  "https://images.unsplash.com/photo-1761125065373-05a8e2f85cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Indomie noodles bowl",
    className: "col-span-7 row-span-7",
  },
  {
    src: "https://images.unsplash.com/photo-1637235549417-9a949b893b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Indomie Mi Goreng",
    className: "col-span-5 row-span-7",
  },
  {
    src: "https://images.unsplash.com/photo-1680675494363-75bbf9838a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Indonesian Mi Goreng",
    className: "col-span-5 row-span-5",
  },
  {
    src:cup,
    alt: "Indonesian instant noodles",
    className: "col-span-7 row-span-5",
  },
  // {
  //   src:pord,
  //   alt: "Indomie noodles meal",
  //   className: "col-span-4 row-span-5",
  // },
];



export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1727819793522-6ea2e6690432",
  "https://images.unsplash.com/photo-1637235549417-9a949b893b04",
  "https://images.unsplash.com/photo-1680675494363-75bbf9838a09",
  "https://images.unsplash.com/photo-1761125065373-05a8e2f85cd5",
];

export const HERO_GRID = [
  { src: HERO_IMAGES[0], col: 7, row: 7 },
  { src: HERO_IMAGES[1], col: 5, row: 7 },
  { src: HERO_IMAGES[2], col: 4, row: 5 },
  { src: HERO_IMAGES[3], col: 4, row: 5 },
  { src: HERO_IMAGES[0], col: 4, row: 5 },
];

export const HERO_CONTENT = {
  badge: "Indonesia's Best Noodle 🇮🇩",
  title: "Show Off Your Indomie Moment! ",
  highlight: " Win Big Every Week  🎉",
  subtitle:
    "Snap your favorite Indomie creation, share it, collect likes, and win awesome prizes weekly!",
  backdrop: heroBackdrop,
};
