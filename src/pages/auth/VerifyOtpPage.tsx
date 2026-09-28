import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PillButton } from '../../components/ui/PillButton';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { CheckCircle2, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const VerifyOtpPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || 'collector@demo.scrapsaathi.local';
  const navigate = useNavigate();
  const { verifyOtp, user } = useAuth();

  const [otp, setOtp] = useState('123456'); // Pre-filled with demo code for convenience
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const ok = await verifyOtp(emailParam, otp);
      if (ok) {
        setSuccess(true);
        setTimeout(() => {
          if (user?.role === 'RECYCLER') {
            navigate('/app/recycler');
          } else {
            navigate('/app/collector');
          }
        }, 1200);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-[#f2ffe3]">
      <div className="max-w-md w-full">
        <EditorialCard>
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#f2ffe3] border border-[#cccccc] flex items-center justify-center mx-auto mb-3 text-[#0d5b3b]">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
              Security Verification
            </span>
            <h1 className="font-serif font-light text-3xl text-[#083a26] mt-1">
              Verify your identity.
            </h1>
            <p className="text-xs text-[#526061] mt-1">
              A 6-digit confirmation code was sent to <strong className="text-gray-900">{emailParam}</strong>
            </p>
          </div>

          {/* Demo helper banner */}
          <div className="mb-5 p-3 rounded-2xl bg-[#f2ffe3] border border-[#0d5b3b]/30 flex items-start gap-2 text-xs text-[#083a26]">
            <Sparkles className="w-4 h-4 text-[#0d5b3b] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Prototype Code: </span>
              <span>Default demo OTP is <code className="bg-white px-2 py-0.5 rounded font-mono font-bold">123456</code></span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="p-4 bg-[#f2ffe3] border border-[#0d5b3b] rounded-2xl text-center text-[#083a26] font-bold text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0d5b3b]" />
              <span>Account verified! Launching your portal...</span>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center font-mono font-bold text-3xl tracking-[0.4em] py-3.5 bg-white border border-[#cccccc] rounded-full focus:outline-none focus:ring-2 focus:ring-[#a3fda7] focus:border-[#0d5b3b]"
                  placeholder="000000"
                  required
                />
              </div>

              <PillButton
                type="submit"
                variant="primary"
                className="w-full justify-center"
                disabled={loading}
              >
                {loading ? 'Verifying Code...' : 'Confirm & Enter Platform'}
              </PillButton>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setOtp('123456')}
                  className="text-xs text-[#526061] hover:text-[#0d5b3b] hover:underline"
                >
                  Resend code (123456)
                </button>
              </div>
            </form>
          )}
        </EditorialCard>
      </div>
    </div>
  );
};
