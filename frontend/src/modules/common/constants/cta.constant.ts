import { FloatingNoodle, NoodleSwirl } from "../components/Ui/NoodleDecorations";
import type { CTAConfig } from "../type";


export const REGISTER_CTA: CTAConfig = {
  id: "register-cta",
  backgroundClass:
    "bg-gradient-to-br from-[#E2231A] to-[#c41e16] text-white",
  title: "Let's Get You Started! 🍜",
  subtitle:
    "Join the fun, share your Indomie love, and win awesome prizes every week!",
  button: {
    label: "Join Now - It's FREE! 🎉",
    to: "/register",
    variant: "primary",
  },
  showWhenAuth: false,
  decorations: [
    {
      component: FloatingNoodle,
      className:
        "absolute top-10 left-[8%] w-24 h-24 opacity-20 animate-float",
      delay: 0,
    },
    {
      component: FloatingNoodle,
      className:
        "absolute top-20 right-[12%] w-20 h-20 opacity-20 animate-float",
      delay: 1,
    },
    {
      component: FloatingNoodle,
      className:
        "absolute bottom-10 left-[15%] w-16 h-16 opacity-20 animate-float",
      delay: 2,
    },
    {
      component: NoodleSwirl,
      className:
        "absolute bottom-20 right-[8%] w-32 h-32 opacity-20 animate-spin-slow",
    },
  ],
};
