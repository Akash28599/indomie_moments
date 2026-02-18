import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogIn, ArrowLeft, ArrowRight } from "lucide-react";
import { useAppDispatch, useRequestOtpMutation, verifyUserOtpThunk } from "@/store";

import { Decorations } from "../../../common/components/Decorations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../../../app/ui/input-otp";
import { toast } from "react-toastify";

/** Strip everything except digits */
const digitsOnly = (v: string) => v.replace(/\D/g, "");

/** Validate 10-digit Nigerian phone numbers */
const isValid10Digits = (phone: string) => /^\d{10}$/.test(digitsOnly(phone));

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

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

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
    if (!isValid10Digits(cleaned)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setInlineMessage(null);
      await requestOtp({ phoneNumber: cleaned }).unwrap();
      toast.success("OTP sent! Please check your phone");
      setStep("otp");
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
        <div className="min-h-screen bg-gradient-to-br from-[#E2231A] via-[#c41e16] to-[#FFD700] flex items-center justify-center px-4 py-12 relative overflow-hidden">
          <Decorations />

          <div className="max-w-md w-full relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white hover:text-[#FFD700] transition-colors mb-4 font-semibold"
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
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(digitsOnly(e.target.value).slice(0, 10))
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
                </>
              )}
            </div>
          </div>
        </div>
      
    </>
  );
};
