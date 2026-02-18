export interface HeroImage {
  src: string;
  col: number;
  row: number;
}

export interface HeroConfig {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  images: HeroImage[];
}
