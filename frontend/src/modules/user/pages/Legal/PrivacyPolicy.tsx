import React from "react";
import { Shield, Lock, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-[#DF2020] px-8 py-10 text-white">
            <Shield className="w-12 h-12 mb-4 opacity-90" />
            <h1 className="text-3xl font-black italic tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-white/80 font-medium italic">Last Updated: April 30, 2026</p>
          </div>

          <div className="p-8 md:p-12 prose prose-slate max-w-none">
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#DF2020]">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 m-0">1. Information We Collect</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                As part of the Indomie Moments campaign, we collect certain Personal Identifiable Information (PII) to facilitate your participation and prize distribution:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li><strong>Personal Identity:</strong> Full name and phone number.</li>
                <li><strong>Visual Content:</strong> Photos and videos ("Moments") you upload to the platform.</li>
                <li><strong>Social Data:</strong> Likes and interaction metrics associated with your submissions.</li>
                <li><strong>Location:</strong> General location data to help you find redemption centers.</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 m-0">2. How We Use Your Data</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your data is used strictly for the following purposes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>To verify your identity for prize redemption.</li>
                <li>To display your "Moments" on the public gallery and leaderboard.</li>
                <li>To contact you if you win a prize (Airtime, Mega Prizes).</li>
                <li>To comply with regulatory requirements of the Nigerian Data Protection Act (NDPA).</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 m-0">3. Data Protection & Security</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your PII. We do not sell or lease your personal data to third parties for marketing purposes. Your data is stored on secure servers and access is limited to authorized Tolaram personnel.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-black text-gray-900 mb-4">4. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                Under the NDPA, you have the right to access, correct, or request the deletion of your personal data. If you wish to withdraw your participation or have your "Moments" removed, please contact our support team.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                Indomie Moments by Tolaram
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
