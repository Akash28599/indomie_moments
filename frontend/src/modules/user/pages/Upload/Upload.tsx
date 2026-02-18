import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload as UploadIcon, ImagePlus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppSelector, selectUser, useCreateMomentMutation } from '@/store';
import { Decorations } from '../../../common/components/Decorations';
import { NoodleSwirl, ChiliPepper } from '../../../common/components/Ui/NoodleDecorations';
import { pord } from '../../../../assets/index';

export const Upload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [consent, setConsent] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const user = useAppSelector(selectUser);
  const isAuthenticated = Boolean(user);
  const navigate = useNavigate();
  const [createMoment, { isLoading: isUploading }] = useCreateMomentMutation();

  if (!isAuthenticated) {
    navigate('/register');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !caption.trim() || !consent) return;

    // Ensure we have a valid user session before uploading
    if (!user) {
      setUploadStatus('error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption.trim());
      formData.append('consentGiven', consent ? 'true' : 'false');
      await createMoment(formData).unwrap();
      setUploadStatus('success');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    }
  };

  const maxCaptionLength = 300;
  const remainingChars = maxCaptionLength - caption.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 relative overflow-hidden">
     
     <Decorations/>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Share Your <span className="text-[#E2231A]">Indomie Moment</span>
          </h1>
          <p className="text-xl text-gray-600">
            Upload your best Indomie photo and compete for amazing prizes!
          </p>
        </div>

        {uploadStatus === 'error' ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Failed</h2>
            <p className="text-lg text-gray-600 mb-6">Something went wrong. Please try again.</p>
            <button
              type="button"
              onClick={() => setUploadStatus('idle')}
              className="bg-[#E2231A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#c41e16]"
            >
              Try Again
            </button>
          </div>
        ) : uploadStatus === 'success' ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center relative overflow-hidden">
            <NoodleSwirl className="absolute -top-10 -right-10 w-32 h-32 opacity-10 animate-spin-slow" />
            <ChiliPepper className="absolute -bottom-5 -left-5 w-20 h-20 opacity-10 rotate-12" />
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Successful!</h2>
            <p className="text-lg text-gray-600 mb-2">
              Your Indomie moment has been submitted for review.
            </p>
            <div className="bg-yellow-50 border-2 border-[#FFD700] rounded-xl p-6 mt-6">
              <p className="text-gray-800 font-semibold">
                ⏱️ Your content will be reviewed by our moderation team within 24-48 hours
              </p>
              <p className="text-sm text-gray-600 mt-2">
                You'll be able to see the status in your profile page once reviewed
              </p>
            </div>
          </div>
        ) : (
          // Upload Form
          <form onSubmit={handleSubmit} className="bg-white relative rounded-3xl shadow-xl p-8 md:p-10 overflow-hidden">
            <img src={pord} alt="Product" className='opacity-15 absolute w-[80%] right-1/2 left-1/2 top-1/3' />
            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Upload Image <span className="text-[#E2231A]">*</span>
              </label>
              
              {!imagePreview ? (
                <label
                  htmlFor="image-upload"
                  className="block border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-[#E2231A] hover:bg-red-50 transition-all"
                >
                  <ImagePlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Click to upload your Indomie moment
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG or GIF (MAX. 5MB)
                  </p>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-2xl shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Change Image
                  </button>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="mb-8">
              <label htmlFor="caption" className="block text-lg font-bold text-gray-900 mb-4">
                Caption <span className="text-[#E2231A]">*</span>
              </label>
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, maxCaptionLength))}
                maxLength={maxCaptionLength}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#E2231A] focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your Indomie moment... 🍜"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Add hashtags to get more likes! #IndomieLife #NoodleLover
                </p>
                <p className={`text-sm font-semibold ${remainingChars < 20 ? 'text-[#E2231A]' : 'text-gray-500'}`}>
                  {remainingChars} characters left
                </p>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5 text-[#E2231A] rounded focus:ring-[#E2231A] focus:ring-2"
                />
                <span className="text-gray-700 group-hover:text-gray-900">
                  I consent to Indomie using my uploaded image for promotional purposes including social media, marketing materials, and website display. <span className="text-[#E2231A]">*</span>
                </span>
              </label>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-900 mb-2">Submission Guidelines:</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Image must feature Indomie products</li>
                    <li>• No offensive or inappropriate content</li>
                    <li>• Original photos only (no stock images)</li>
                    <li>• Images will be reviewed within 30 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!imagePreview || !caption || !consent || isUploading}
              className="w-full bg-[#E2231A] text-white py-5 rounded-full font-bold text-xl hover:bg-[#c41e16] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isUploading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="w-6 h-6" />
                  Submit Your Moment
                </>
              )}
            </button>
          </form>
        )}

        {/* Tips Section */}
        {uploadStatus === 'idle' && (
          <div className="mt-8 bg-gradient-to-r from-[#FFD700] to-yellow-400 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Tips to Get More Likes:</h3>
            <ul className="space-y-2 text-gray-800">
              <li>✓ Show your creative Indomie recipe or presentation</li>
              <li>✓ Include good lighting and clear composition</li>
              <li>✓ Add engaging hashtags in your caption</li>
              <li>✓ Share your post link on social media</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};