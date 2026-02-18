import { PAGE_CONTENT } from "./constant/moments.constants";


export const CTASection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#E2231A] to-[#c41e16] rounded-3xl p-12 text-center text-white">
      <h2 className="text-3xl font-black mb-4">
        {PAGE_CONTENT.ctaTitle}
      </h2>
      <p className="text-xl mb-6 text-white/90">
        {PAGE_CONTENT.ctaSubtitle}
      </p>
      <a
        href={PAGE_CONTENT.ctaLink}
        className="inline-block bg-[#FFD700] text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors"
      >
        {PAGE_CONTENT.ctaButton}
      </a>
    </div>
  );
};
