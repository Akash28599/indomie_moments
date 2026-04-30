import React from "react";
import { Scale, ShieldCheck, HelpCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-[#DF2020] transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="bg-white shadow-2xl rounded-[3rem] overflow-hidden border border-slate-100">
          <div className="bg-slate-900 px-8 py-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black italic tracking-tight mb-2">Terms of Service</h1>
              <p className="text-white/60 font-bold italic">Rules for participating in Indomie Moments</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-[#DF2020]" />
                <h2 className="text-2xl font-black text-slate-900 italic">1. Eligibility</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-bold text-sm">
                Participation is open to all residents of Nigeria who are 13 years of age or older. Participants under 18 must have parental or guardian consent to enter and claim prizes.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-[#DF2020]" />
                <h2 className="text-2xl font-black text-slate-900 italic">2. Submission Rules</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-bold text-sm mb-4">
                By uploading an Indomie Moment, you certify that:
              </p>
              <ul className="space-y-3">
                {[
                  "The content is your original work and does not infringe on third-party copyrights.",
                  "The content is appropriate and does not contain offensive or illegal imagery.",
                  "You grant Tolaram a non-exclusive, worldwide, royalty-free license to use, display, and promote your submission.",
                  "All PII provided is accurate and belongs to you."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 italic mb-6">3. Prize Distribution</h2>
              <p className="text-slate-600 leading-relaxed font-bold text-sm">
                Prizes (Airtime, Mega Rewards) are non-transferable and cannot be exchanged for cash. Verification via phone number and OTP is required for all digital rewards.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Failure to comply with these terms may lead to disqualification.
              </p>
            </section>
          </div>
        </div>
        
        <div className="mt-12 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">© Tolaram Group 2026</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
