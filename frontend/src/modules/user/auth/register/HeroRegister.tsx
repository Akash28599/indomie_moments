import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  useAppDispatch,
  useRequestOtpMutation,
  verifyUserOtpThunk,
} from "@/store";
import { Decorations } from "../../../common/components/Decorations";
import { toast } from "react-toastify";

/** Strip everything except digits */
const digitsOnly = (v: string) => v.replace(/\D/g, "");

/** Accept exactly 10 digits */
const isValid10Digits = (phone: string) => /^\d{10}$/.test(digitsOnly(phone));

const isValidName = (name: string) => name.trim().length >= 2;

export const HeroRegister = ({ onSwitch }: { onSwitch: () => void }) => {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const otpInputRef = useRef<HTMLInputElement>(null);

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
  }, []);

  // Auto-focus OTP input when step changes
  useEffect(() => {
    if (step === "otp" && otpInputRef.current) {
      setTimeout(() => otpInputRef.current?.focus(), 100);
    }
  }, [step]);

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
        onSwitch();
        return;
      }

      toast.success("OTP sent! Please check your phone");
      setStep("otp");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "We couldn't send the OTP. Please try again."
      );
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = digitsOnly(e.target.value).slice(0, 6);
    setOtp(value);
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
        })
      ).unwrap();

      toast.success("Account created 🎉 Welcome to Indomie!");
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };

      toast.error(
        e?.data?.message || "Invalid or expired OTP. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && otp.length === 6) {
      handleVerifyOTP();
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md">
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
            <p className="text-gray-500 text-sm">
              Join the Indomie community
            </p>
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
                    className="w-full px-4 py-3 border-2 border-gray-200 text-black focus:outline-none rounded-lg transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-gray-100  border-2 border-r-0 border-gray-200 rounded-l-lg text-gray-600 font-semibold">
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
                      className="w-full py-3 px-4 border-2 border-l-0 border-gray-200  focus:outline-none rounded-r-lg transition text-black"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full bg-[#E2231A] hover:bg-[#c41e16] disabled:bg-gray-400 transition text-white py-3 rounded-full font-bold flex justify-center items-center gap-2"
                >
                  {sendingOtp ? "Sending..." : "Continue"}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Switch */}
              <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-600">
                <p>Already have an account?</p>
                <span
                  onClick={onSwitch}
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

              {/* Hidden input for OTP */}
              <input
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                onKeyDown={handleKeyDown}
                placeholder="000000"
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                autoComplete="one-time-code"
              />

              {/* Visual OTP display */}
              <div
                className="flex justify-center gap-3 mb-8 cursor-text"
                onClick={() => otpInputRef.current?.focus()}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`w-12 h-14 rounded-lg border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                      otp[index]
                        ? "border-[#000000]  text-black"
                        : index === otp.length
                        ? "border-[#000000] bg-white text-black"
                        : "border-gray-300 bg-white text-black"
                    }`}
                  >
                    {otp[index] || ""}
                  </div>
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isVerifying || otp.length !== 6}
                className="w-full bg-[#E2231A] hover:bg-[#c41e16] disabled:bg-gray-400 text-white py-3 rounded-full font-bold transition"
              >
                {isVerifying ? "Verifying..." : "Verify & Register"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-600">
                <p>Didn't receive code?</p>
                <span
                  onClick={() => setStep("details")}
                  className="text-[#E2231A] font-semibold cursor-pointer hover:underline"
                >
                  Try again
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
