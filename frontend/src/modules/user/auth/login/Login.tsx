import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogIn, ArrowLeft, ArrowRight } from "lucide-react";
import { useAppDispatch, useRequestOtpMutation, verifyUserOtpThunk } from "@/store";

import { Decorations } from "../../../common/components/Decorations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../../../app/ui/input-otp";
import { toast } from "react-toastify";

/** Strip everything except digits */
const digitsOnly = (v: string) => v.replace(/\D/g, "");

/** Validate phone number — relaxed for dev (just needs some digits) */
const isValidPhone = (phone: string) => digitsOnly(phone).length >= 4;

interface LoginProps {
  isHero?: boolean; // determines hero-style layout
  onSwitch?: () => void; // optional callback to switch between login/register
}

export const Login = ({ isHero = true, onSwitch }: LoginProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [inlineMessage, setInlineMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    const phoneFromUrl = params.get("phone");
    if (phoneFromUrl) setPhone(decodeURIComponent(phoneFromUrl));
    if (message) {
      const decoded = decodeURIComponent(message);
      toast.info(decoded);
      setInlineMessage(decoded);
      params.delete("message");
      const nextSearch = params.toString();
      navigate(nextSearch ? `${location.pathname}?${nextSearch}` : location.pathname, {
        replace: true,
      });
    }
  }, [location.search, location.pathname, navigate]);

  const otpSlotClass = "w-12 h-14 text-2xl border-2 border-gray-300 rounded-lg";

  const [requestOtp, { isLoading: sendingOtp }] = useRequestOtpMutation();

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = digitsOnly(phone);
    if (!isValidPhone(cleaned)) {
      toast.error("Please enter a phone number");
      return;
    }

    try {
      setInlineMessage(null);
      await requestOtp({ phoneNumber: cleaned }).unwrap();
      toast.success("OTP sent! Please check your phone");
      setStep("otp");
      setCountdown(30);
    } catch (err: any) {
      const message: string | undefined = err?.data?.message;
      if (message === "This number is not registered. Please register first.") {
        const info =
          "This number is not registered. Please create an account to continue.";
        toast.info(info);
        navigate(`/register?phone=${encodeURIComponent(cleaned)}&message=${encodeURIComponent(info)}`, { replace: true });
        return;
      }
      toast.error(message ?? "We couldn't send the OTP. Please try again later.");
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    try {
      await dispatch(
        verifyUserOtpThunk({ phoneNumber: digitsOnly(phone), code: otp })
      ).unwrap();

      toast.success("Login successful 🎉 Welcome back!");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const e = err as { message?: string; data?: { message?: string } };
      toast.error(e?.data?.message ?? e?.message ?? "Invalid or expired OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
        <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4 py-12 relative overflow-hidden">
          <Decorations />

          <div className="max-w-md w-full relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E2231A] transition-colors mb-4 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-3xl font-black mb-2">
                  <span className="text-[#E2231A]">INDO</span>
                  <span className="text-[#FFD700]">MIE</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-gray-600">Login to continue</p>
              </div>

              {inlineMessage && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm text-center">
                  {inlineMessage}
                </div>
              )}

              {step === "phone" && (
               <>
                <form onSubmit={handleSubmitPhone} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-4 bg-gray-100 border-2 border-r-0 rounded-l-lg text-gray-600 font-semibold select-none">
                        +234
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={15}
                        value={phone}
                        onChange={(e) =>
                          setPhone(digitsOnly(e.target.value))
                        }
                        required
                        className="w-full py-3 px-4 border-2 border-l-0 rounded-r-lg"
                        placeholder="8012345678"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sendingOtp}
                    className="w-full bg-[#E2231A] text-white py-4 rounded-full font-bold flex justify-center gap-2"
                  >
                    {sendingOtp ? "Sending..." : "Send Code"}
                    <LogIn />
                  </button>
                </form>

                {/* OR Divider */}
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    Or sign in with
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/myindomiemoments/backend/api/auth/google`;
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm text-gray-700 cursor-pointer"
                  >
                    <svg className="w-5 h-5 font-bold" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/myindomiemoments/backend/api/auth/facebook`;
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#1877F2] bg-[#1877F2] hover:bg-[#166fe5] rounded-xl transition-all font-semibold text-sm text-white shadow-md shadow-blue-100 cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>

                  <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-600">
                <p>New to Indomie ? </p>
                <span
                  onClick={()=>{navigate('/register')}}
                  className="text-[#E2231A] font-semibold cursor-pointer hover:underline"
                >
                  Register Now
                </span>
              </div>
               </>
              )}

              {step === "otp" && (
                <>
                  <div className="text-center mb-6">
                    <p className="text-gray-600">Code sent to</p>
                    <p className="font-bold">+234 {phone}</p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot key={index} index={index} className={otpSlotClass} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <button
                    onClick={handleVerifyOTP}
                    disabled={isVerifying || otp.length !== 6}
                    className="w-full bg-[#E2231A] text-white py-4 rounded-full font-bold"
                  >
                    {isVerifying ? "Verifying..." : "Verify & Login"}
                  </button>

                  <div className="flex items-center justify-between mt-6 px-2">
                    <button
                      onClick={() => setStep("phone")}
                      className="text-gray-400 font-bold text-xs uppercase tracking-wider hover:text-[#E2231A] transition-colors"
                    >
                      Change Phone
                    </button>

                    <button
                      onClick={(e) => handleSubmitPhone(e as any)}
                      disabled={countdown > 0 || sendingOtp}
                      className="text-gray-400 font-bold text-xs uppercase tracking-wider hover:text-[#E2231A] transition-colors disabled:opacity-50 disabled:hover:text-gray-400"
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      
    </>
  );
};
