import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { indomieLogo } from '../../../../../assets';
import type { FooterConfig } from '../type';

export const userFooterConfig: FooterConfig = {
  theme: 'user',
  backgroundClass: 'bg-gray-900 text-white',
  brand: {
    logo: indomieLogo,
    description:
      'Indonesia’s favorite instant noodles since 1970.',
  },
  sections: [
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '/', internal: true },
        { label: 'Indomie Moments', href: '/moments', internal: true },
        { label: 'Leaderboard', href: '/leaderboard', internal: true },
        { label: 'Upload', href: '/upload', internal: true },
      ],
    },
    // {
    //   title: 'Legal',
    //   links: [
    //     { label: 'Terms & Conditions', href: '#' },
    //     { label: 'Privacy Policy', href: '#' },
    //     { label: 'Community Guidelines', href: '#' },
    //     { label: 'Contact Us', href: '#' },
    //   ],
    // },
  ],
  // socialLinks: [
  //   { href: '#', icon: Facebook },
  //   { href: '#', icon: Instagram },
  //   { href: '#', icon: Twitter },
  //   { href: '#', icon: Youtube },
  // ],
  copyright:
    'Indomie. All rights reserved.',
};
