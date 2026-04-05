import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow px-6 py-8 sm:px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <Link to="/" className="text-secondary hover:underline">
            Back to Home
          </Link>
        </div>
        
        <div className="prose prose-indigo max-w-none text-gray-700 space-y-6">
          <p>
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Introduction</h2>
            <p>
              Welcome to Indomie Moments! This structure represents the privacy policy
              governing your use of our website, games, and applications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>
              We collect information to provide better services to our users. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Information you give us (e.g., name, phone number, email address, social login data).</li>
              <li>Information we get from your use of our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. How We Use Information</h2>
            <p>
              We use the information we collect from all our services to provide, maintain, 
              protect and improve them, to develop new ones, and to protect Indomie Moments and our users.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Data Deletion Instructions</h2>
            <p>
              According to Facebook Platform rules, we have to provide User Data Deletion Callback URL or 
              Data Deletion Instructions URL. If you want to delete your activities for our App, you can 
              remove your information by following these steps:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Go to your Facebook Account's Setting & Privacy. Click "Settings".</li>
              <li>Look for "Apps and Websites" and you will see all of the apps and websites you linked with your Facebook.</li>
              <li>Search and Click "Indomie Moments" in the search bar.</li>
              <li>Scroll and click "Remove".</li>
              <li>Congratulations, you have successfully removed your app activities.</li>
            </ol>
            <p className="mt-2">
              Alternatively, you can email us directly to request data deletion of any database records associated with your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
