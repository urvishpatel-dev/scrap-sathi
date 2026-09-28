import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PillButton } from '../../components/ui/PillButton';
import { PillInput } from '../../components/ui/PillInput';
import { EditorialCard } from '../../components/ui/EditorialCard';
import { UserRole } from '../../types';
import { 
  User, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('COLLECTOR');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [organizationName, setOrganizationName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        email,
        password,
        role: selectedRole,
        name,
        organizationName: selectedRole === 'RECYCLER' ? organizationName : undefined,
        city
      });

      // Route to OTP verification with email query param
      navigate(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-[#f2ffe3]">
      <div className="max-w-xl w-full">
        <EditorialCard>
          {/* STEP 1: How will you use ScrapSaathi? */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest font-bold text-[#0d5b3b]">
                  Step 1 of 2
                </span>
                <h1 className="font-serif font-light text-4xl text-[#083a26] mt-1">
                  How will you use ScrapSaathi?
                </h1>
                <p className="text-xs text-[#526061] mt-1.5">
                  Choose your role to receive the tailored application experience
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Choice 1: Collector */}
                <div
                  onClick={() => handleRoleSelect('COLLECTOR')}
                  className="p-6 rounded-[24px] border-2 border-[#cccccc] hover:border-[#0d5b3b] hover:bg-[#f2ffe3] cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#0d5b3b] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <User className="w-6 h-6 text-[#a3fda7]" />
                    </div>
                    <span className="font-serif text-2xl font-normal text-[#083a26] block">
                      COLLECTOR
                    </span>
                    <span className="text-xs text-[#0d5b3b] font-semibold block mt-0.5">
                      कबाड़ीवाला / सूक्ष्म संग्राहक
                    </span>
                    <p className="text-xs text-[#526061] mt-2.5 leading-relaxed">
                      "I collect and sell scrap."
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0d5b3b]">
                    <span>Continue as Collector</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Choice 2: Recycler */}
                <div
                  onClick={() => handleRoleSelect('RECYCLER')}
                  className="p-6 rounded-[24px] border-2 border-[#cccccc] hover:border-[#0d5b3b] hover:bg-[#f2ffe3] cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#083a26] text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Building2 className="w-6 h-6 text-[#a3fda7]" />
                    </div>
                    <span className="font-serif text-2xl font-normal text-[#083a26] block">
                      RECYCLER
                    </span>
                    <span className="text-xs text-[#0d5b3b] font-semibold block mt-0.5">
                      पुनर्चक्रण व्यवसाय
                    </span>
                    <p className="text-xs text-[#526061] mt-2.5 leading-relaxed">
                      "I source and process recyclable material."
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0d5b3b]">
                    <span>Continue as Recycler</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-[#526061] pt-2">
                Already registered?{' '}
                <Link to="/login" className="text-[#0d5b3b] font-bold hover:underline">
                  Sign in here
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: Profile details & Credentials */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#526061] hover:text-[#083a26]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Role ({selectedRole})</span>
                </button>
                <span className="text-xs font-bold text-[#0d5b3b] bg-[#f2ffe3] px-2.5 py-0.5 rounded-full border border-[#cccccc]/40">
                  Step 2 of 2
                </span>
              </div>

              <div>
                <h2 className="font-serif font-light text-3xl text-[#083a26]">
                  Complete your {selectedRole.toLowerCase()} registration
                </h2>
                <p className="text-xs text-[#526061] mt-1">
                  We will send a 6-digit verification code to confirm your account
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {selectedRole === 'COLLECTOR' ? (
                  <PillInput
                    label="Full Name / नाम"
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                ) : (
                  <>
                    <PillInput
                      label="Organization / Facility Name"
                      placeholder="e.g. GreenCycle Solutions Ltd."
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      required
                    />
                    <PillInput
                      label="Contact Person Name"
                      placeholder="e.g. Sanjay Shah"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PillInput
                    label="Email Address"
                    type="email"
                    placeholder="user@domain.com"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <PillInput
                    label="Mobile Phone / फ़ोन"
                    type="tel"
                    placeholder="+91 98250 00000"
                    icon={<Phone className="w-4 h-4" />}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PillInput
                    label="Operating City"
                    placeholder="Ahmedabad, Gujarat"
                    icon={<MapPin className="w-4 h-4" />}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />

                  <PillInput
                    label="Create Password"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <PillButton
                  type="submit"
                  variant="primary"
                  className="w-full justify-center mt-2"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Continue to Verification'}
                </PillButton>
              </form>
            </div>
          )}
        </EditorialCard>
      </div>
    </div>
  );
};
