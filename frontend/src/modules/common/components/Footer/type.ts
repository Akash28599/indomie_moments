import type { LucideIcon } from "lucide-react";


export interface FooterIconLink {
  label?: string;
  href: string;
  icon?: LucideIcon;
  internal?: boolean;
}

export interface FooterSection {
  title?: string;
  links: FooterIconLink[];
}

export interface FooterBrand {
  logo?: string;
  title?: string;
  badge?: {
    label: string;
    icon?: LucideIcon;
  };
  description?: string;
}

export interface FooterDecoration {
  component: React.FC<any>;
  className: string;
  delay?: number;
}

export interface FooterConfig {
  theme: 'admin' | 'user';
  backgroundClass: string;
  brand?: FooterBrand;
  sections: FooterSection[];
  socialLinks?: FooterIconLink[];
  decorations?: FooterDecoration[];
  copyright: string;
}
