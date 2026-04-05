import React from "react";
import { Link } from "react-router-dom";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow px-6 py-8 sm:px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <Link to="/" className="text-secondary hover:underline">
            Back to Home
          </Link>
        </div>
        
        <div className="prose prose-indigo max-w-none text-gray-700 space-y-6">
          <p>
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Indomie Moments, you accept and agree to be bound by the terms 
              and provision of this agreement. Use of the service indicates your acceptance of these policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Eligibility</h2>
            <p>
              To participate in campaigns or use the platform, you must meet the specific eligibility 
              requirements of the promotion, usually determined by age and jurisdiction. By signing up via 
              Phone Number, Facebook, or Google, you verify that you are eligible according to local laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account information, 
              including any OTPs (One-Time Passwords). You agree to accept responsibility for all 
              activities that occur under your account or password.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Disclaimers and Limitations</h2>
            <p>
              The platform and all contents are provided on an "as is" and "as available" basis. 
              We make no representations or warranties of any kind regarding the platform's operation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Modifications to Service</h2>
            <p>
              We reserve the right at any time to modify or discontinue, temporarily or permanently, 
              the service with or without notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
