import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PillButton } from '../ui/PillButton';
import { 
  Recycle, 
  User, 
  Building2, 
  ShieldAlert, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  QrCode
} from 'lucide-react';

export const AppNavbar: React.FC = () => {
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const isPublicPage = !location.pathname.startsWith('/app') && !location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 bg-[#f2ffe3]/90 backdrop-blur-md border-b border-[#cccccc]/40">
      {/* Top Prototype & Demo Quick-Switcher Ribbon */}
      <div className="bg-[#083a26] text-[#a3fda7] text-xs py-1.5 px-4">
        <div className="max-w-editorial mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#0d5b3b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
              SIH Full-Product Build
            </span>
            <span className="hidden sm:inline text-white/80">
              Kabadiwala Connect — Informal into Formal Recycling Chain
            </span>
          </div>

          {/* Quick Demo Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="flex items-center gap-1.5 bg-[#0d5b3b] hover:bg-[#174B36] text-white px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all"
            >
              <Sparkles className="w-3 h-3 text-[#a3fda7]" />
              <span>Switch Demo Persona</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl p-2 shadow-editorial border border-[#cccccc] z-50 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1 block">
                  Instant Demo Login
                </span>
                <button
                  onClick={async () => {
                    await loginAsDemo('COLLECTOR');
                    setDemoMenuOpen(false);
                    navigate('/app/collector');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-[#2d3637] hover:bg-[#f2ffe3] rounded-xl flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#0d5b3b]" />
                  <div>
                    <span className="block font-bold">Collector (रमेश कुमार)</span>
                    <span className="text-[10px] text-gray-500 font-normal">Ahmedabad Micro-collector</span>
                  </div>
                </button>

                <button
                  onClick={async () => {
                    await loginAsDemo('RECYCLER');
                    setDemoMenuOpen(false);
                    navigate('/app/recycler');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-[#2d3637] hover:bg-[#f2ffe3] rounded-xl flex items-center gap-2 mt-1"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#0d5b3b]" />
                  <div>
                    <span className="block font-bold">Recycler (GreenCycle)</span>
                    <span className="text-[10px] text-gray-500 font-normal">GPCB Authorized Facility</span>
                  </div>
                </button>

                <button
                  onClick={async () => {
                    await loginAsDemo('ADMIN');
                    setDemoMenuOpen(false);
                    navigate('/admin');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-[#2d3637] hover:bg-[#f2ffe3] rounded-xl flex items-center gap-2 mt-1 border-t border-gray-100 pt-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#0d5b3b]" />
                  <div>
                    <span className="block font-bold">Admin Portal</span>
                    <span className="text-[10px] text-gray-500 font-normal">Disputes & Audit Logs</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-[#0d5b3b] flex items-center justify-center text-white shadow-pill group-hover:bg-[#083a26] transition-colors">
            <Recycle className="w-6 h-6 text-[#a3fda7]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-2xl tracking-tight text-[#083a26]">
                Scrap<span className="text-[#0d5b3b]">Saathi</span>
              </span>
              <span className="text-[9px] bg-[#a3fda7] text-[#000000] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                स्क्रैपसाथी
              </span>
            </div>
            <p className="text-[11px] text-[#838676] -mt-1 hidden sm:block">
              Kabadiwala Connect • Formal Circular Supply
            </p>
          </div>
        </Link>

        {/* Public Desktop Nav Links */}
        {isPublicPage && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2d3637]">
            <Link to="/how-it-works" className="hover:text-[#0d5b3b] transition-colors">
              How It Works
            </Link>
            <Link to="/collectors" className="hover:text-[#0d5b3b] transition-colors">
              For Collectors
            </Link>
            <Link to="/recyclers" className="hover:text-[#0d5b3b] transition-colors">
              For Recyclers
            </Link>
            <Link to="/passport/LOT-2026-000184" className="hover:text-[#0d5b3b] transition-colors flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-[#0d5b3b]" />
              <span>Lot Passport</span>
            </Link>
            <Link to="/about" className="hover:text-[#0d5b3b] transition-colors">
              About
            </Link>
          </nav>
        )}

        {/* App Portal Links when logged in */}
        {!isPublicPage && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {user?.role === 'COLLECTOR' && (
              <>
                <Link to="/app/collector" className="text-[#0d5b3b] hover:underline">Overview</Link>
                <Link to="/app/collector/lots" className="text-[#2d3637] hover:text-[#0d5b3b]">My Lots</Link>
                <Link to="/app/collector/lots/new" className="text-[#2d3637] hover:text-[#0d5b3b] font-bold text-[#0d5b3b]">+ Create Lot</Link>
                <Link to="/app/collector/offers" className="text-[#2d3637] hover:text-[#0d5b3b]">Offers</Link>
                <Link to="/app/collector/transactions" className="text-[#2d3637] hover:text-[#0d5b3b]">Handovers</Link>
              </>
            )}
            {user?.role === 'RECYCLER' && (
              <>
                <Link to="/app/recycler" className="text-[#0d5b3b] hover:underline">Dashboard</Link>
                <Link to="/app/recycler/discover" className="text-[#2d3637] hover:text-[#0d5b3b]">Discover Lots</Link>
                <Link to="/app/recycler/quotes" className="text-[#2d3637] hover:text-[#0d5b3b]">My Quotes</Link>
                <Link to="/app/recycler/inventory" className="text-[#2d3637] hover:text-[#0d5b3b]">Inventory</Link>
                <Link to="/app/recycler/analytics" className="text-[#2d3637] hover:text-[#0d5b3b]">Analytics</Link>
              </>
            )}
            {user?.role === 'ADMIN' && (
              <>
                <Link to="/admin" className="text-[#0d5b3b] hover:underline">Overview</Link>
                <Link to="/admin/lots" className="text-[#2d3637] hover:text-[#0d5b3b]">Lots</Link>
                <Link to="/admin/disputes" className="text-[#2d3637] hover:text-[#0d5b3b]">Disputes</Link>
                <Link to="/admin/audit" className="text-[#2d3637] hover:text-[#0d5b3b]">Audit Logs</Link>
              </>
            )}
          </nav>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#2d3637] hidden lg:inline bg-white px-3 py-1.5 rounded-full border border-[#cccccc]">
                {user?.role === 'COLLECTOR' ? user.collectorProfile?.name : user?.recyclerProfile?.organizationName || user?.email}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 text-[#838676] hover:text-[#000000] hover:bg-white rounded-full transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <PillButton variant="tertiary" size="sm">
                  Log In
                </PillButton>
              </Link>
              <Link to="/signup">
                <PillButton variant="primary" size="sm">
                  Get Started
                </PillButton>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2d3637] hover:bg-white rounded-full"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#cccccc] px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-[#2d3637]">
            <Link onClick={() => setMobileMenuOpen(false)} to="/how-it-works">How It Works</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/collectors">For Collectors</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/recyclers">For Recyclers</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/passport/LOT-2026-000184">Public Lot Passport</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/about">About ScrapSaathi</Link>
          </nav>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link onClick={() => setMobileMenuOpen(false)} to="/login">
                  <PillButton variant="tertiary" className="w-full justify-center">Log In</PillButton>
                </Link>
                <Link onClick={() => setMobileMenuOpen(false)} to="/signup">
                  <PillButton variant="primary" className="w-full justify-center">Get Started</PillButton>
                </Link>
              </>
            ) : (
              <PillButton
                variant="secondary"
                className="w-full justify-center"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
              >
                Log Out
              </PillButton>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
