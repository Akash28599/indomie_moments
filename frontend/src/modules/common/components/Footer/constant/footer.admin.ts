import {
  Shield,
  Home,
  ClipboardCheck,
  Mail,
  Lock,
} from 'lucide-react';

import { indomieLogo } from '../../../../../assets';
import { ChiliPepper, FloatingNoodle, NoodleSwirl } from '../../Ui/NoodleDecorations';
import type { FooterConfig } from '../type';

export const adminFooterConfig: FooterConfig = {
  theme: 'admin',
  backgroundClass:
    'bg-gradient-to-br from-[#E2231A] via-[#c41e16] to-[#E2231A] text-white',
  brand: {
    logo: indomieLogo,
    badge: {
      label: 'Admin Portal',
      icon: Shield,
    },
    description:
      'Content moderation system for Indomie Moments.',
  },
  decorations: [
    {
      component: FloatingNoodle,
      className: 'absolute top-10 left-[5%] w-24 h-24 opacity-20 animate-float',
      delay: 0,
    },
    {
      component: NoodleSwirl,
      className: 'absolute bottom-20 left-[10%] w-32 h-32 opacity-15 animate-spin-slow',
    },
    {
      component: ChiliPepper,
      className: 'absolute top-32 right-[15%] w-20 h-20 opacity-20 animate-bounce-slow',
    },
  ],
  sections: [
    {
      title: 'Admin',
      links: [
        { label: 'Dashboard', href: '/admin', icon: Home, internal: true },
        {
          label: 'Approvals',
          href: '/admin/approvals',
          icon: ClipboardCheck,
          internal: true,
        },
        { label: 'Login', href: '/admin/login', icon: Lock, internal: true },
      ],
    },
    {
      title: 'Support',
      links: [
        {
          label: 'admin@indomie-promo.com',
          href: 'mailto:admin@indomie-promo.com',
          icon: Mail,
        },
      ],
    },
  ],
  copyright:
    'Indomie Admin Portal. Moderation system.',
};
