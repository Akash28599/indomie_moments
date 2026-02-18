import { HOW_WORKS_DECORATIONS, HOW_WORKS_STEPS } from "./constant/howWorks.constants";

const HowWorks = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorations */}
      {HOW_WORKS_DECORATIONS.map((item, i) => {
        const Deco = item.component;
        return <Deco key={i} className={item.className} />;
      })}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            How Does It Work?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            4 easy steps to become a winner!
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <svg
            className="hidden md:block absolute left-0 w-full h-16 pointer-events-none"
            viewBox="0 0 1000 64"
            preserveAspectRatio="none"
            style={{ top: "32px", transform: "translateY(-50%)", zIndex: 0 }}
          >
            <path
              d="M 80 32 Q 180 10, 280 32 T 480 32 T 680 32 T 920 32"
              fill="none"
              stroke="#FFD700"
              strokeWidth="4"
              strokeDasharray="8 8"
              opacity="0.5"
            />
          </svg>

          {/* Steps */}
          {HOW_WORKS_STEPS.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={i} className="text-center relative z-10">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg
                    ${
                      step.highlight
                        ? "bg-[#FFD700] text-gray-900 animate-pulse"
                        : "bg-[#E2231A] text-white"
                    }`}
                >
                  {step.step}
                </div>

                {Icon && (
                  <Icon className="absolute -top-2 -right-2 w-10 h-10 rotate-45 animate-bounce-slow" />
                )}

                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
