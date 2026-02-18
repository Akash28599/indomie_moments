import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Lock, Shield, Mail } from 'lucide-react';
import { useAppDispatch, loginAdminThunk } from '@/store';
import { FloatingNoodle, NoodleSwirl, ChiliPepper, SteamingBowl, GreenOnion, Carrot } from '../../../common/components/Ui/NoodleDecorations';
import { indomieLogo } from '../../../../assets';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await dispatch(loginAdminThunk({ username, password })).unwrap();
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      setError(e?.data?.message ?? 'Invalid admin credentials');
    } finally {
      setIsLoading(false);
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
          <h1 className="text-3xl font-black text-white mb-2">Content Moderation</h1>
          <p className="text-white/80">Manage Indomie Moments submissions</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username or Email
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#E2231A] focus:outline-none transition-colors"
                  placeholder="Enter username or email"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs text-[#E2231A] font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#E2231A] focus:outline-none transition-colors"
                  placeholder="Enter password"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Login as Admin
                </>
              )}
            </button>
          </form>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};