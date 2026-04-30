import { useState, useRef, useEffect, useCallback } from "react";
import { X, Sparkles, Trophy, Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

interface ScratchCardProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ScratchCard – Simplified flow: Scratch -> Confirm Number -> Success.
 */
export default function ScratchCard({ isOpen, onClose }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [prize] = useState(() => ({ label: "₦400 AIRTIME" }));
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Claim Flow State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const CANVAS_W = 320;
  const CANVAS_H = 320;
  const scratchCountRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctxRef.current = ctx;
    scratchCountRef.current = 0;

    // Premium Golden Gradient
    const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
    grad.addColorStop(0, "#D4AF37");
    grad.addColorStop(0.2, "#FFDF00"); 
    grad.addColorStop(0.5, "#B8860B");
    grad.addColorStop(0.8, "#FFD700");
    grad.addColorStop(1, "#D4AF37");
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Texture
    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineWidth = 1;
    for (let i = -CANVAS_W; i < CANVAS_W + CANVAS_H; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + CANVAS_H, CANVAS_H);
      ctx.stroke();
    }

    // Text Instructions
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH TO REVEAL", CANVAS_W / 2, CANVAS_H / 2);
    
    ctx.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRevealed(false);
      setScratchPercent(0);
      setClaimSuccess(false);
      const t = setTimeout(initCanvas, 150);
      return () => clearTimeout(t);
    }
  }, [isOpen, initCanvas]);

  const calcProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return 0;
    try {
      const imageData = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      const data = imageData.data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      return (cleared / (CANVAS_W * CANVAS_H)) * 100;
    } catch {
      return 0;
    }
  }, []);

  const scratch = useCallback(
    (x: number, y: number) => {
      const ctx = ctxRef.current;
      if (!ctx || revealed) return;
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      scratchCountRef.current += 1;
      if (scratchCountRef.current % 2 === 0) {
        const pct = calcProgress();
        setScratchPercent(pct);
        if (pct > 10 || scratchCountRef.current > 12) setRevealed(true);
      }
    },
    [revealed, calcProgress]
  );

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (CANVAS_W / rect.width),
      y: (clientY - rect.top) * (CANVAS_H / rect.height),
    };
  };

  const handleStart = (e: any) => {
    e.preventDefault();
    setIsScratching(true);
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: any) => {
    e.preventDefault();
    if (!isScratching) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "indomie-scratch-card.png";
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Failed to download card", error);
    }
  };

  const handleClaimAirtime = () => {
    if (!phoneNumber || phoneNumber.length < 10) return;
    setIsProcessing(true);
    // Directly confirm and credit (Simulating MobiFin API)
    setTimeout(() => {
      setClaimSuccess(true);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex items-center justify-between shrink-0">
               <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                  <X className="w-5 h-5" />
               </button>
               <div className="bg-red-50 px-4 py-1.5 rounded-full border border-red-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Instant Reward</span>
               </div>
            </div>

            <div className="px-8 pb-8 text-center flex-1 overflow-y-auto">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2 italic">
                Lucky Scratch!
              </h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
                Scratch the card to reveal your prize
              </p>

              {/* SCRATCH CONTAINER */}
              <div 
                ref={cardRef}
                className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-inner bg-gray-50 border-4 border-gray-50 group"
              >
                {/* Prize Underneath */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={revealed ? { scale: 1 } : { scale: 0 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center mb-4">
                      <Trophy className="w-10 h-10 text-[#FFD700]" />
                    </div>
                    <p className="text-xs font-black text-[#DF2020] uppercase tracking-[0.2em] mb-3">Congratulations! You won</p>
                    <h3 className="text-4xl font-black text-gray-900 leading-tight mb-1">
                      {prize.label}
                    </h3>
                  </motion.div>
                </div>

                {/* Canvas Overlay */}
                <AnimatePresence>
                  {!revealed && (
                    <motion.canvas
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      ref={canvasRef}
                      width={CANVAS_W}
                      height={CANVAS_H}
                      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                      onMouseDown={handleStart}
                      onMouseMove={handleMove}
                      onMouseUp={() => setIsScratching(false)}
                      onTouchStart={handleStart}
                      onTouchMove={handleMove}
                      onTouchEnd={() => setIsScratching(false)}
                    />
                  )}
                </AnimatePresence>
                
                {revealed && (
                  <button
                    data-html2canvas-ignore
                    onClick={downloadCard}
                    className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-[#DF2020] hover:bg-white transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Action Area */}
              <div className="mt-8">
                {revealed ? (
                  claimSuccess ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <p className="font-black text-slate-900 uppercase tracking-widest text-sm italic">Airtime Sent Successfully!</p>
                      <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Done</button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Confirm Phone Number</p>
                        <input
                          type="tel"
                          placeholder="e.g. 08012345678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl text-center font-black text-lg text-gray-900 focus:outline-none focus:border-[#DF2020] transition-all shadow-inner"
                        />
                      </div>
                      <button
                        onClick={handleClaimAirtime}
                        disabled={isProcessing || phoneNumber.length < 10}
                        className="w-full bg-[#DF2020] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-red-500/30 disabled:opacity-50 active:scale-[0.98] transition-all"
                      >
                        {isProcessing ? "Crediting..." : "Claim Airtime Now ⚡"}
                      </button>
                    </motion.div>
                  )
                ) : (
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Scratch to reveal prize</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
