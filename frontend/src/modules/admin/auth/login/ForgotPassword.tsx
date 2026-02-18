import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, Shield, ArrowLeft } from 'lucide-react';
import { useForgotPasswordMutation } from '@/store';
import { FloatingNoodle, NoodleSwirl, ChiliPepper, SteamingBowl, GreenOnion, Carrot } from '../../../common/components/Ui/NoodleDecorations';
import { indomieLogo } from '../../../../assets';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    try {
      await forgotPassword({ email: email.trim() }).unwrap();
      setSuccess(true);
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      setError(e?.data?.message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2231A] via-[#c41e16] to-[#E2231A] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#FFD700] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Noodle Decorations */}
      <FloatingNoodle className="absolute top-10 left-[5%] w-20 h-20 opacity-20 animate-float" delay={0} />
      <FloatingNoodle className="absolute top-32 right-[10%] w-16 h-16 opacity-15 animate-float" delay={1} />
      <FloatingNoodle className="absolute bottom-20 left-[15%] w-24 h-24 opacity-20 animate-float" delay={2} />
      <NoodleSwirl className="absolute top-20 right-[5%] w-32 h-32 opacity-15 animate-spin-slow" />
      <ChiliPepper className="absolute bottom-32 right-[20%] w-16 h-16 opacity-20 rotate-12 animate-bounce-slow" />
      <SteamingBowl className="absolute top-40 left-[30%] w-24 h-24 opacity-20 animate-bounce" />
      <GreenOnion className="absolute bottom-40 right-[30%] w-16 h-16 opacity-20 animate-float" />
      <Carrot className="absolute top-50 right-[5%] w-16 h-16 opacity-20 animate-spin" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <img
            src={indomieLogo}
            alt="Indomie"
            className="h-24 w-auto mx-auto mb-4"
          />
          <div className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
            <Shield className="w-5 h-5" />
            <span className="font-bold">Admin Portal</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Forgot Password</h1>
          <p className="text-white/80">Enter your email to receive a reset link</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                If an account exists with that email, a password reset link has been sent. Please check your inbox.
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-[#E2231A] font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#E2231A] focus:outline-none transition-colors"
                      placeholder="Enter your admin email"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-red-800 font-semibold">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#E2231A] text-white py-4 rounded-full font-bold text-lg hover:bg-[#c41e16] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link to="/admin/login" className="text-[#E2231A] font-semibold hover:underline">
                    Back to Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            &larr; Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
