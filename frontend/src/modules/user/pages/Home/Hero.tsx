import { ArrowRight, Upload } from "lucide-react";
import { BENTO_IMAGES, HERO_CONTENT } from "./constant/home.constant";
import { AppButton } from "../../../common/components/Button/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { useState } from "react";
import { HeroLogin } from "../../auth/login/HeroLogin";
import { HeroRegister } from "../../auth/register/HeroRegister";
import { Decorations } from "@/modules/common/components/Decorations";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  return (
    <section className="relative bg-gradient-to-br from-[#E2231A] to-[#c41e16] text-white">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 md:w-64 md:h-64 bg-[#FFD700] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 md:w-96 md:h-96 bg-yellow-300 rounded-full blur-3xl" />
      </div>

      <Decorations />
      {/* Backdrop */}
      <div
        className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-contain pointer-events-none"
        style={{ backgroundImage: `url(${HERO_CONTENT.backdrop})` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* LEFT SIDE (TEXT) */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              {HERO_CONTENT.title} <br />
              <span className="text-[#FFD700]">{HERO_CONTENT.highlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto md:mx-0">
              Snap your favorite Indomie creation, share it, collect likes, and
              win awesome prizes weekly!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {isAuthenticated ? (
                <AppButton
                  label="Upload Your Moment"
                  to="/upload"
                  icon={<Upload size={20} />}
                  variant="primary"
                />
              ) : (
                <button
                  onClick={() => setAuthMode("register")}
                  className="bg-white text-[#E2231A] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                >
                  Register Now
                </button>
              )}

              {isAuthenticated && (
                <AppButton
                  label="View All Moments"
                  to="/moments"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                  variant="secondary"
                />
              )}
            </div>
          </div>

          {/* RIGHT SIDE (AUTH FORM) */}
          <div className="w-full md:w-1/2 flex justify-center items-center pointer-events-auto">
            {isAuthenticated ? (
              <div className="relative h-[600px] grid grid-cols-12 grid-rows-12 gap-3 pointer-events-auto">
                {BENTO_IMAGES.map((image, index) => (
                  <div
                    key={index}
                    className={`${image.className} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative w-full max-w-md pointer-events-auto">
                {authMode === "login" ? (
                  <HeroLogin onSwitch={() => setAuthMode("register")} />
                ) : (
                  <HeroRegister onSwitch={() => setAuthMode("login")} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
