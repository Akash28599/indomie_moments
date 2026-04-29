import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, LogIn, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { 
  useAppDispatch, 
  useRequestOtpMutation, 
  verifyUserOtpThunk 
} from "@/store";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "../../../app/ui/input-otp";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const digitsOnly = (v: string) => v.replace(/\D/g, "");

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const dispatch = useAppDispatch();
  const [requestOtp, { isLoading: sendingOtp }] = useRequestOtpMutation();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = digitsOnly(phone);
    if (cleaned.length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      await requestOtp({ phoneNumber: cleaned }).unwrap();
      toast.success("OTP sent! Please check your phone");
      setStep("otp");
      setCountdown(30);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP. Please try again.");
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

      toast.success("Welcome to Indomie Moments! 🎉");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 w-full max-w-md bg-white rounded-t-[3rem] p-8 pb-12 z-[101] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-[#DF2020] italic tracking-tighter">
                Login / Sign Up
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-500 font-medium mb-8">
              Join the <span className="text-[#DF2020] font-bold">Indomie Moments</span> community and start winning today!
            </p>

            {step === "phone" ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                    Phone Number
                  </label>
                  <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-2xl h-16 px-4 focus-within:border-red-100 transition-colors">
                    <span className="text-gray-900 font-black text-lg border-r border-gray-200 pr-4 mr-4">
                      +234
                    </span>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(digitsOnly(e.target.value).slice(0, 10))}
                      placeholder="800 000 0000"
                      className="bg-transparent flex-1 outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sendingOtp}
                  className="w-full bg-[#DF2020] text-white h-16 rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {sendingOtp ? "Sending..." : "Send OTP"}
                  {!sendingOtp && <ArrowRight className="w-5 h-5" />}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-4">
                  <div className="flex-1 h-[1px] bg-gray-100" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    OR CONTINUE WITH
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-100" />
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => {
                        window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/auth/google`;
                    }}
                    className="h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Google
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                        window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/auth/facebook`;
                    }}
                    className="h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center gap-3 font-bold hover:bg-[#166fe5] transition-colors"
                  >
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 brightness-0 invert" alt="Facebook" />
                    Facebook
                  </button>
                </div>

                {/* Footer Links */}
                <p className="text-[10px] text-center text-gray-400 font-medium px-4 leading-relaxed">
                  By continuing, you agree to our {" "}
                  <a href="#" className="text-gray-600 font-bold underline">Terms of Service</a> {" "}
                  and {" "}
                  <a href="#" className="text-gray-600 font-bold underline">Privacy Policy</a>.
                </p>
              </form>
            ) : (
              <div className="space-y-8 py-4">
                <div className="text-center">
                  <p className="text-gray-500 font-semibold mb-2">Code sent to</p>
                  <p className="text-2xl font-black text-gray-900">+234 {phone}</p>
                </div>

                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
                    <InputOTPGroup className="gap-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index} 
                          className="w-12 h-16 border-2 border-gray-100 rounded-xl text-xl font-bold focus:border-[#DF2020] transition-colors"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleVerifyOTP}
                    disabled={isVerifying || otp.length !== 6}
                    className="w-full bg-[#DF2020] text-white h-16 rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform disabled:opacity-50"
                  >
                    {isVerifying ? "Verifying..." : "Verify & Start Winning"}
                    {!isVerifying && <LogIn className="w-5 h-5" />}
                  </button>

                  <div className="flex items-center justify-between px-2">
                    <button 
                      onClick={() => setStep("phone")}
                      className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-[#DF2020] transition-colors"
                    >
                      Change Phone
                    </button>

                    <button
                      onClick={() => handleSendOTP()}
                      disabled={countdown > 0 || sendingOtp}
                      className="text-gray-400 font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:text-[#DF2020] transition-colors disabled:opacity-50 disabled:hover:text-gray-400"
                    >
                      {countdown > 0 ? (
                        `Resend in ${countdown}s`
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3" />
                          Resend OTP
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
