import type { CTAConfig } from "../type";
import { AppButton } from "./Button/Button";

interface Props {
  config: CTAConfig;
  isAuthenticated: boolean;
}

const CTA = ({ config, isAuthenticated }: Props) => {
  if (config.showWhenAuth === false && isAuthenticated) return null;

  const handleJoinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default navigation
    e.preventDefault();
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden ${config.backgroundClass}`}
    >
      {/* Decorations */}
      {config.decorations?.map((item, i) => {
        const Deco = item.component;
        return <Deco key={i} className={item.className} delay={item.delay} />;
      })}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
          {config.title}
        </h2>

        {config.subtitle && (
          <p className="text-lg sm:text-xl mb-8 opacity-90">{config.subtitle}</p>
        )}

        <AppButton
          label={config.button.label}
          to={config.button.to}
          variant={config.button.variant ?? "primary"}
          onClick={handleJoinClick} // <-- intercept click
        />
      </div>
    </section>
  );
};

export default CTA;
