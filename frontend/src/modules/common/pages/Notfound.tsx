import { indomieLogo } from "../../../assets/index";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2231A] to-[#c41e16] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">

        {/* Logo */}
        <img
          src={indomieLogo}
          alt="Indomie"
          className="h-20 mx-auto mb-8 drop-shadow-xl"
        />

        {/* 404 Title */}
        <h1 className="text-7xl md:text-8xl font-black text-white mb-4">
          404
        </h1>

        <h2 className="text-4xl font-bold text-yellow-400 mb-6">
          Oops! This Page Is Not Cooked Yet 🍜
        </h2>

        <p className="text-white text-lg mb-10 opacity-90">
          Looks like this page went missing...  
          Maybe it got eaten before serving 😅  
          Let’s get you back to something delicious.
        </p>

        {/* CTA Button */}
        <Link
          to="/"
          className="inline-block bg-yellow-400 text-red-700 font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
