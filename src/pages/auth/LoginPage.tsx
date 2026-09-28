import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PillButton } from '../../components/ui/PillButton';
import { PillInput } from '../../components/ui/PillInput';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  User, 
  Building2, 
  ShieldAlert, 
  AlertCircle 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // Route based on role
      const storedToken = localStorage.getItem('scrapsaathi_token');
      if (email.includes('collector')) {
        navigate('/app/collector');
      } else if (email.includes('recycler')) {
        navigate('/app/recycler');
      } else if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/app/collector');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'COLLECTOR' | 'RECYCLER' | 'ADMIN') => {
    setLoading(true);
    try {
      await loginAsDemo(role);
      if (role === 'COLLECTOR') navigate('/app/collector');
      else if (role === 'RECYCLER') navigate('/app/recycler');
      else navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-[#f2ffe3]">
      <div className="max-w-md w-full">
        <EditorialCard>
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
              ScrapSaathi Portal
            </span>
            <h1 className="font-serif font-light text-4xl text-[#083a26] mt-1">
              Welcome back.
            </h1>
            <p className="text-xs text-[#526061] mt-1">
              Log in to manage lots, review quotes, or inspect handovers
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <PillInput
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PillInput
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs text-[#526061] px-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded text-[#0d5b3b] focus:ring-[#a3fda7]" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#0d5b3b] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>

            <PillButton
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </PillButton>
          </form>

          {/* Quick Demo Logins for judges */}
          <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#838676]">
                Instant Demo Personas
              </span>
              <span className="text-[10px] bg-[#f2ffe3] text-[#0d5b3b] font-bold px-2 py-0.5 rounded-full border border-[#cccccc]/40">
                1-Click
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('COLLECTOR')}
                className="p-2.5 rounded-2xl border border-[#cccccc] hover:border-[#0d5b3b] hover:bg-[#f2ffe3] text-center transition-all group"
              >
                <User className="w-4 h-4 mx-auto text-[#0d5b3b] mb-1" />
                <span className="text-[11px] font-bold text-[#083a26] block">Collector</span>
                <span className="text-[9px] text-gray-500 block truncate">Ramesh Kumar</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('RECYCLER')}
                className="p-2.5 rounded-2xl border border-[#cccccc] hover:border-[#0d5b3b] hover:bg-[#f2ffe3] text-center transition-all group"
              >
                <Building2 className="w-4 h-4 mx-auto text-[#0d5b3b] mb-1" />
                <span className="text-[11px] font-bold text-[#083a26] block">Recycler</span>
                <span className="text-[9px] text-gray-500 block truncate">GreenCycle</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="p-2.5 rounded-2xl border border-[#cccccc] hover:border-[#0d5b3b] hover:bg-[#f2ffe3] text-center transition-all group"
              >
                <ShieldAlert className="w-4 h-4 mx-auto text-[#0d5b3b] mb-1" />
                <span className="text-[11px] font-bold text-[#083a26] block">Admin</span>
                <span className="text-[9px] text-gray-500 block truncate">Audit Hub</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[#526061]">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#0d5b3b] font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </EditorialCard>
      </div>
    </div>
  );
};
