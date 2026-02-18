import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  useAppDispatch,
  useRequestOtpMutation,
  verifyUserOtpThunk,
} from "@/store";
import { Decorations } from "../../../common/components/Decorations";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../../app/ui/input-otp";
import { toast } from "react-toastify";

/** Strip everything except digits */
const digitsOnly = (v: string) => v.replace(/\D/g, "");

/** Accept exactly 10 digits */
const isValid10Digits = (phone: string) => /^\d{10}$/.test(digitsOnly(phone));

const isValidName = (name: string) => name.trim().length >= 2;

export const Register = () => {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [requestOtp, { isLoading: sendingOtp }] = useRequestOtpMutation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("returnUrl") || "/upload";

  // If user was redirected here from login because the number is not registered,
  // prefill phone and show an info message.
  useEffect(() => {
    const message = params.get("message");
    const phoneFromUrl = params.get("phone");

    if (phoneFromUrl) {
      setPhone(decodeURIComponent(phoneFromUrl));
    }

    if (message) {
      const decoded = decodeURIComponent(message);
      toast.info(decoded);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const otpSlotClass = "w-12 h-14 text-2xl border-2 border-gray-300 rounded-lg";

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidName(name)) {
      toast.error("Please enter your full name");
      return;
    }

    const cleaned = digitsOnly(phone);
    if (!isValid10Digits(cleaned)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await requestOtp({
        phoneNumber: cleaned,
        fullName: name.trim(),
      }).unwrap();

      if (response.flow === "login") {
        toast.info("User already exists, please login.");
        const message = encodeURIComponent(
          "User already exists, please login.",
        );
        navigate(
          `/login?phone=${encodeURIComponent(cleaned)}&message=${message}`,
          { replace: true },
        );
        return;
      }

      toast.success("OTP sent! Please check your phone");
      setStep("otp");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "We couldn't send the OTP. Please try again.",
      );
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
        verifyUserOtpThunk({
          phoneNumber: digitsOnly(phone),
          code: otp,
        }),
      ).unwrap();

      toast.success("Account created 🎉 Welcome to Indomie!");
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      const e = err as { message?: string; data?: { message?: string } };

      toast.error(
        e?.data?.message ?? e?.message ?? "Invalid or expired OTP. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E2231A] via-[#c41e16] to-[#FFD700] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <Decorations />

      <div className="w-full max-w-md">
        <div className="max-w-md w-full relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white hover:text-[#FFD700] transition-colors mb-4 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-3xl font-black mb-2">
              <span className="text-[#E2231A]">INDO</span>
              <span className="text-[#FFD700]">MIE</span>
            </div>
            <h1 className="text-2xl font-bold mb-1 text-black">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm">Join the Indomie community</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* DETAILS STEP */}
          {step === "details" && (
            <>
              <form onSubmit={handleSubmitDetails} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#E2231A] focus:outline-none rounded-lg transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-lg text-gray-600 font-semibold">
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
                      placeholder="8012345678"
                      className="w-full py-3 px-4 border-2 border-l-0 border-gray-200 focus:border-[#E2231A] focus:outline-none rounded-r-lg transition text-black"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full bg-[#E2231A] hover:bg-[#c41e16] transition text-white py-3 rounded-full font-bold flex justify-center items-center gap-2"
                >
                  {sendingOtp ? "Sending..." : "Continue"}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Switch */}
              <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-600">
                <p>Already have an account?</p>
                <span
                  onClick={()=>{navigate('/login')}}
                  className="text-[#E2231A] font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </div>
            </>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm">Code sent to</p>
                <p className="font-bold text-black">+234 {phone}</p>
              </div>

              <div className="flex justify-center mb-8">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-14 text-xl border-2 border-gray-200 rounded-lg"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isVerifying || otp.length !== 6}
                className="w-full bg-[#E2231A] hover:bg-[#c41e16] transition text-white py-3 rounded-full font-bold"
              >
                {isVerifying ? "Verifying..." : "Verify & Register"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
