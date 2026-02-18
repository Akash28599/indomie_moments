export type DecorationComponent =
  | 'FloatingNoodle'
  | 'NoodleBowl'
  | 'SteamingBowl'
  | 'ChiliPepper'
  | 'NoodleSwirl';

export interface DecorationConfig {
  Component: DecorationComponent;
  className: string;
  props?: Record<string, unknown>;
}

export const DECORATIONS: DecorationConfig[] = [
  {
    Component: 'FloatingNoodle',
    className: 'absolute top-20 left-[3%] w-24 h-24 opacity-15 animate-float',
    props: { delay: 0 },
  },
  {
    Component: 'FloatingNoodle',
    className: 'absolute top-[40%] right-[5%] w-20 h-20 opacity-15 animate-float',
    props: { delay: 1 },
  },
  {
    Component: 'NoodleBowl',
    className: 'absolute top-[60%] left-[8%] w-32 h-32 opacity-10 rotate-12 animate-float',
  },
  {
    Component: 'SteamingBowl',
    className: 'absolute top-10 right-[10%] w-40 h-40 opacity-10 -rotate-12',
  },
  {
    Component: 'ChiliPepper',
    className: 'absolute bottom-20 right-[3%] w-16 h-16 opacity-20 rotate-45 animate-bounce-slow',
  },
  {
    Component: 'NoodleSwirl',
    className: 'absolute bottom-32 left-[5%] w-24 h-24 opacity-10 animate-spin-slow',
  },
];
