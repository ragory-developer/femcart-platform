"use client";

import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/lib/config';
import { Logger } from '@/lib/logger';
import { useCartStore } from '@/store/cartStore';
import { CheckCircle2, Eye, EyeOff, KeyRound, Loader2, Lock, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Tab = 'password' | 'otp';
type OtpStep = 'email' | 'verify';
type LoginUser = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'ADMIN' | 'USER' | 'SUPER_ADMIN';
  permissions?: string[];
  isGuest?: boolean;
  gender?: string;
  dateOfBirth?: string;
  [key: string]: unknown;
};

const inputCls = "block w-full rounded-xl border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 sm:text-sm bg-gray-50/50 dark:bg-gray-900/50 transition-all duration-300";
const btnCls = "w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3.5 rounded-xl hover:from-red-500 hover:to-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 shadow-[0_8px_20px_rgba(220,38,38,0.25)] hover:shadow-[0_12px_25px_rgba(220,38,38,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none mt-6 text-sm flex items-center justify-center gap-2";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function LoginTabs() {
  const [tab, setTab] = useState<Tab>('password');

  // Password tab state
  const [pwEmail, setPwEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState('');

  // OTP tab state
  const [otpEmail, setOtpEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState<OtpStep>('email');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Success banner
  const [successMsg, setSuccessMsg] = useState('');

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show "Account created" banner if coming from register page
  useEffect(() => {
    if (searchParams?.get('registered') === '1') {
      setSuccessMsg('🎉 Account created! Please log in with your email and password.');
    }
  }, [searchParams]);

  // OTP countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const storeAndNavigate = async (accessToken: string, refreshToken: string, user: LoginUser) => {
    login(accessToken, refreshToken, user);
    
    // If local cart has items, push to backend (override). Otherwise, pull from backend.
    const cartStore = useCartStore.getState();
    if (cartStore.items.length > 0) {
       await cartStore.syncLocalCartToBackend();
    } else {
       await cartStore.fetchBackendCart();
    }

    let redirectTo = searchParams?.get('redirect');
    if (!redirectTo) {
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        redirectTo = '/admin';
      } else {
        redirectTo = '/dashboard';
      }
    }
    router.push(redirectTo);
  };

  /* ── Email + Password login ── */
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    
    if (pwEmail.length < 5 || !pwEmail.includes('@')) {
      setPwError('Please enter a valid email address');
      toast.error('Invalid email address');
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pwEmail, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid email or password');
      
      toast.success('Login successful');
      storeAndNavigate(data.data.accessToken, data.data.refreshToken, data.data.user);
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Login failed');
      setPwError(msg);
      toast.error(msg);
      Logger.warn('Password login failed', err, 'LoginTabs');
    } finally {
      setPwLoading(false);
    }
  };

  /* ── OTP: send ── */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (otpEmail.length < 5 || !otpEmail.includes('@')) {
      setOtpError('Please enter a valid email address');
      toast.error('Invalid email address');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/send-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to send OTP');
      
      toast.success('OTP sent successfully');
      setCountdown(60);
      setOtpStep('verify');
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Failed to send OTP');
      setOtpError(msg);
      toast.error(msg);
      Logger.warn('OTP send failed', err, 'LoginTabs');
    } finally {
      setOtpLoading(false);
    }
  };

  /* ── OTP: verify ── */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setOtpLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail, code: otp }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid OTP');
      
      toast.success('Login successful');
      storeAndNavigate(data.data.accessToken, data.data.refreshToken, data.data.user);
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'Failed to verify OTP');
      setOtpError(msg);
      toast.error(msg);
      Logger.warn('OTP verification failed', err, 'LoginTabs');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Success banner (post-signup redirect) */}
      {successMsg && (
        <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
          {successMsg}
        </div>
      )}

      {/* Tab switcher */}
      <div className="flex bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-2xl mb-8 relative">
        {([
          { key: 'password', label: 'Password' },
          { key: 'otp',      label: 'Email OTP' },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setPwError(''); setOtpError(''); }}
            className={`flex-1 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl z-10
              ${tab === t.key
                ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Email + Password ── */}
      {tab === 'password' && (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          {pwError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
              {pwError}
            </div>
          )}

          <div>
            <label htmlFor="pwEmail" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">Email address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                id="pwEmail"
                type="email"
                placeholder="name@example.com"
                className={inputCls}
                value={pwEmail}
                onChange={e => setPwEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Password</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className={inputCls}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPass ? 'Hide password' : 'Show password'}
                aria-pressed={showPass}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPass(v => !v)}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={pwLoading || pwEmail.length < 5 || !password}
              className={btnCls}
            >
              {pwLoading ? <Loader2 className="animate-spin" size={18} /> : 'Sign in securely'}
            </button>
        </form>
      )}

      {/* ── Tab: OTP Login ── */}
      {tab === 'otp' && (
        <div>
          {otpError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium mb-4">
              {otpError}
            </div>
          )}

          {otpStep === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label htmlFor="otpEmail" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    id="otpEmail"
                    type="email"
                    placeholder="name@example.com"
                    className={inputCls}
                    value={otpEmail}
                    onChange={e => setOtpEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                id="otp-send-btn"
                type="submit"
                disabled={otpLoading || otpEmail.length < 5 || !otpEmail.includes('@')}
                className={btnCls}
              >
                {otpLoading ? <Loader2 className="animate-spin" size={18} /> : 'Send secure code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="otp-code" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">6-Digit Code</label>
                  <span className="text-xs text-gray-500">Sent to <strong className="text-gray-900 dark:text-gray-200 font-medium">{otpEmail}</strong></span>
                </div>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                  <input
                    id="otp-code"
                    type="text"
                    inputMode="numeric"
                    required
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="block w-full rounded-lg border-0 py-2.5 pl-11 pr-4 text-center tracking-[0.7em] text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-lg sm:leading-6 bg-white dark:bg-gray-800 transition-all shadow-sm font-bold"
                  />
                </div>
                <div className="text-center mt-2 text-sm">
                  {countdown > 0 ? (
                    <span className="text-gray-400">Resend in <strong className="text-blue-600">{countdown}s</strong></span>
                  ) : (
                    <button type="button" onClick={() => { setOtpStep('email'); setOtp(''); }} className="text-red-600 font-medium hover:text-red-500">
                      Resend code
                    </button>
                  )}
                </div>
              </div>
              <button
                id="otp-verify-btn"
                type="submit"
                disabled={otpLoading || otp.length < 6}
                className={btnCls}
              >
                {otpLoading ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle2 size={18} /> Verify & Continue</>}
              </button>
              <button type="button" onClick={() => { setOtpStep('email'); setOtp(''); setOtpError(''); }}
                className="w-full text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                &larr; Change email address
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
