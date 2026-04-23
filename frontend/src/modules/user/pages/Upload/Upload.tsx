import { useState } from "react";
import { 
  Upload as UploadIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { useCreateMomentMutation } from "@/store";
import ScratchCard from "../Home/ScratchCard";

/**
 * Upload Page – Dedicated screen for sharing moments.
 * Users can upload an image, write a caption, and get a reward.
 */
export const Upload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [showScratchCard, setShowScratchCard] = useState(false);
  
  const [createMoment, { isLoading: isUploading }] = useCreateMomentMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !caption.trim()) return;
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("caption", caption.trim());
      formData.append("consentGiven", "true");
      await createMoment(formData).unwrap();
      setUploadStatus("success");
      setImageFile(null);
      setImagePreview(null);
      setCaption("");
      // Show scratch card reward after a brief delay
      setTimeout(() => setShowScratchCard(true), 800);
    } catch {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  const handleScratchCardClose = () => {
    setShowScratchCard(false);
    setUploadStatus("idle");
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen pb-32 font-sans px-5 pt-8">
      {/* ═══ ScratchCard Reward Modal ═══ */}
      {showScratchCard && (
        <ScratchCard isOpen={showScratchCard} onClose={handleScratchCardClose} />
      )}

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Share Your Story</h2>
          <p className="text-gray-500 text-sm">Upload your Indomie moment and win amazing prizes!</p>
        </div>

        {/* ═══ Upload Section ═══ */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span className="text-[#DF2020]">📷</span> New Moment
            </h3>
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200/60">
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
              <span className="text-[10px] font-black text-[#B8860B] uppercase tracking-wider">Earn rewards per post</span>
            </div>
          </div>

          {uploadStatus === "success" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <p className="font-black text-gray-900 text-xl mb-1">Moment Submitted! 🎉</p>
              <p className="text-sm text-gray-500 font-medium tracking-wide">Get ready to scratch your reward card…</p>
            </div>
          ) : uploadStatus === "error" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <p className="font-black text-gray-900 text-xl mb-1">Upload Failed</p>
              <p className="text-sm text-gray-500 font-medium tracking-wide">Please try again</p>
            </div>
          ) : (
            <>
              {/* Image Upload Zone */}
              {!imagePreview ? (
                <label
                  htmlFor="page-upload"
                  className="block border-2 border-dashed border-[#DF2020]/30 rounded-2xl p-12 text-center cursor-pointer hover:border-[#DF2020] hover:bg-red-50/20 transition-all group bg-[#F9FAFB]/50"
                >
                  <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadIcon className="w-8 h-8 text-[#DF2020]" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Tap to upload your photo</p>
                  <p className="text-xs font-medium text-gray-500 tracking-wide">JPG, PNG (Max 5MB)</p>
                  <input
                    id="page-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative mb-6 group rounded-3xl overflow-hidden shadow-md">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                      className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl transform hover:scale-105 transition-transform"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Describe your moment</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value.slice(0, 200))}
                  maxLength={200}
                  rows={4}
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-gray-100 rounded-3xl text-sm font-medium focus:border-[#DF2020]/50 focus:ring-4 focus:ring-red-50 focus:bg-white transition-all resize-none outline-none placeholder:text-gray-400"
                  placeholder="Tell us what makes this Indomie moment special... #IndomieLife 🍜"
                />
                <div className="flex justify-end px-1">
                  <span className="text-[10px] font-bold text-gray-400">
                    {caption.length}/200
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!imagePreview || !caption.trim() || isUploading}
                className="w-full mt-6 bg-[#DF2020] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#C41E16] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-200"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Submit & Get Reward
                  </>
                )}
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
};