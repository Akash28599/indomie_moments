import React from "react";
import { Shield, Lock, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
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
          <div className="bg-[#DF2020] px-8 py-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black italic tracking-tight mb-2">Privacy Policy</h1>
              <p className="text-white/80 font-bold italic">Protecting your Indomie Moments & PII Data</p>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                  <CheckCircle className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="font-black text-blue-900 uppercase text-sm mb-1 tracking-wider">NDPA Compliance</h3>
                  <p className="text-blue-800 text-sm font-medium leading-relaxed">
                    This policy is aligned with the <strong>Nigerian Data Protection Act (NDPA)</strong> to ensure 100% compliance in handling your Personal Identifiable Information (PII).
                  </p>
               </div>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-[#DF2020]" />
                <h2 className="text-2xl font-black text-slate-900 italic">1. Data Collection</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 font-medium">
                To participate in the Indomie Moments campaign, we collect the following Personal Identifiable Information (PII):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Identity", desc: "Your full name and phone number." },
                  { title: "Visuals", desc: "Photos and videos you upload." },
                  { title: "Social", desc: "Likes and engagement on your posts." },
                  { title: "Device", desc: "IP address and browser type for security." }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-black text-[#DF2020] text-xs uppercase mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-[#DF2020]" />
                <h2 className="text-2xl font-black text-slate-900 italic">2. Usage & Disclosure</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                We use your information strictly for campaign operations:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Verifying prize winners for Airtime and Mega Rewards.",
                  "Displaying your 'Moments' in the public gallery and leaderboard.",
                  "Internal analytics to improve the user experience.",
                  "Complying with Tolaram Cybersec and legal audit requirements."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-bold text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DF2020] mt-1.5 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] mb-4 text-center">Contact Cybersec Team</h3>
              <p className="text-slate-400 text-xs text-center font-bold leading-relaxed max-w-md mx-auto">
                If you have questions regarding your data privacy, you can reach out to our compliance team through the official Tolaram support channels.
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

export default PrivacyPolicy;
