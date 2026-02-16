
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PostCard } from '@/components/feed/PostCard';
import { dummyPosts } from '@/lib/dummy-data';
import { ChevronLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function HomePage() {
  const router = useRouter();
  const [view, setView] = useState<'landing' | 'join' | 'signin' | 'forgot-password' | 'otp-verification'>('landing');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split posts into two lists for the columns
  const midPoint = Math.ceil(dummyPosts.length / 2);
  const leftColumnPosts = dummyPosts.slice(0, midPoint);
  const rightColumnPosts = dummyPosts.slice(midPoint);

  // Triple the items to ensure a perfectly seamless loop even on tall screens
  const leftScrollerPosts = [...leftColumnPosts, ...leftColumnPosts, ...leftColumnPosts];
  const rightScrollerPosts = [...rightColumnPosts, ...rightColumnPosts, ...rightColumnPosts];

  const handleOtpChange = (index: number, value: string) => {
    if (value !== '' && !/^[0-9]$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleMockAuth = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('voice_user', JSON.stringify({
      name: 'John Doe',
      handle: '@johndoe',
      avatar: 'https://picsum.photos/seed/me/100/100'
    }));
    router.push('/feed');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('otp-verification');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('signin');
  };

  useEffect(() => {
    if (view === 'otp-verification') {
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => otpRefs.current[0]?.focus(), 500);
    }
  }, [view]);

  return (
    <div className="h-screen flex justify-center bg-transparent overflow-hidden">
      <div className="w-full max-w-[1250px] h-full flex flex-col lg:flex-row bg-transparent overflow-hidden mx-auto">
        {/* Left Section (Auth) */}
        <div className="w-full lg:w-[40%] xl:w-[35%] h-full bg-transparent relative z-10 overflow-hidden flex flex-col">
          <div className="flex-grow relative w-full h-full">
            
            {/* Landing View */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-in-out transform ${view === 'landing' ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}`}>
              <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
                <div className="mb-6">
                  <div className="flex items-center gap-1">
                    <h1 className="text-4xl font-black tracking-tighter text-primary">
                      VOICE<span className="text-[#2DD0B3]">.</span>
                    </h1>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white leading-tight mb-8 tracking-tight">
                  Connect.<br />
                  Speak Freely.
                </h2>
                <div className="space-y-4 w-full">
                  <button onClick={() => setView('join')} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-md text-lg active:scale-[0.98]">
                    Join VOICE Today
                  </button>
                  <button onClick={() => setView('signin')} className="w-full bg-white/40 backdrop-blur-sm hover:bg-white/60 dark:bg-black/20 dark:hover:bg-black/30 text-black dark:text-white font-semibold py-3.5 px-6 border border-white/20 dark:border-white/10 rounded-full transition-all text-lg shadow-sm active:scale-[0.98]">
                    Sign In
                  </button>
                </div>
                <p className="mt-6 text-xs text-center text-subtext-light dark:text-subtext-dark">
                  By continuing, you agree to our <a className="underline hover:text-primary" href="#">Terms of Service</a> and <a className="underline hover:text-primary" href="#">Privacy Policy</a>.
                </p>
              </div>
            </div>

            {/* Join Form View */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${view === 'join' ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}>
              <div className="max-w-md mx-auto w-full">
                <button onClick={() => setView('landing')} className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 group transition-all">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-black dark:text-white mb-1 tracking-tight">Join VOICE</h2>
                  <p className="text-subtext-light dark:text-subtext-dark text-sm">Create your account and start sharing.</p>
                </div>
                <form className="space-y-4" onSubmit={handleMockAuth}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="full-name">Full Name</label>
                    <input className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" id="full-name" name="full-name" placeholder="John Doe" type="text" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email Address</label>
                    <input className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" id="email" name="email" placeholder="john@example.com" type="email" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">Username</label>
                      <input className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" id="username" name="username" placeholder="@johnny" type="text" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="dob">Date of Birth</label>
                      <input className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" id="dob" name="dob" type="date" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
                    <input className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" id="password" name="password" type="password" required />
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" required className="mt-1" />
                    <Label htmlFor="terms" className="text-xs text-subtext-light dark:text-subtext-dark leading-snug cursor-pointer font-medium">
                      I agree to the <a href="#" className="text-primary hover:underline font-bold">Terms of Service</a> and <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>, including Cookie Use.
                    </Label>
                  </div>

                  <button className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-lg text-base font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 mt-4" type="submit">
                    Create Account
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-subtext-light dark:text-subtext-dark">
                  Already have an account? <button onClick={() => setView('signin')} className="text-primary font-bold hover:underline">Sign In</button>
                </p>
              </div>
            </div>

            {/* Sign In View */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${view === 'signin' ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}>
              <div className="max-w-md mx-auto w-full">
                <button onClick={() => setView('landing')} className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 group transition-all">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-black dark:text-white mb-2 tracking-tight">Welcome Back</h2>
                  <p className="text-subtext-light dark:text-subtext-dark">Sign in to see what the world is saying.</p>
                </div>
                <form className="space-y-4" onSubmit={handleMockAuth}>
                  <div className="space-y-2">
                    <label htmlFor="signin-email" className="text-sm font-bold text-black dark:text-white ml-1">Email Address</label>
                    <input id="signin-email" type="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-none bg-white/50 backdrop-blur-sm border border-white/20 dark:border-white/10 dark:bg-black/20 focus:ring-primary focus:border-primary transition-all dark:text-white outline-none" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label htmlFor="signin-password" className="text-sm font-bold text-black dark:text-white">Password</label>
                      <button type="button" onClick={() => setView('forgot-password')} className="text-xs text-primary font-bold hover:underline">Forgot?</button>
                    </div>
                    <input id="signin-password" type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-none bg-white/50 backdrop-blur-sm border border-white/20 dark:border-white/10 dark:bg-black/20 focus:ring-primary focus:border-primary transition-all dark:text-white outline-none" />
                  </div>
                  <button type="submit" className="w-full h-12 rounded-full text-lg font-bold shadow-lg bg-primary hover:bg-primary/90 mt-6 transition-all active:scale-[0.98] text-white">
                    Sign In
                  </button>
                </form>

                <p className="mt-10 text-center text-sm text-subtext-light dark:text-subtext-dark">
                  New to VOICE? <button onClick={() => setView('join')} className="text-primary font-bold hover:underline">Join Today</button>
                </p>
              </div>
            </div>

            {/* Forgot Password View */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${view === 'forgot-password' ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}>
              <div className="max-w-md mx-auto w-full">
                <button onClick={() => setView('signin')} className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 group transition-all">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-black dark:text-white mb-2 tracking-tight">Find your account</h2>
                  <p className="text-subtext-light dark:text-subtext-dark">Enter your email to reset your password.</p>
                </div>
                <form className="space-y-4" onSubmit={handleForgotPasswordSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="forgot-email" className="text-sm font-bold text-black dark:text-white ml-1">Email Address</label>
                    <input id="forgot-email" type="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-none bg-white/50 backdrop-blur-sm border border-white/20 dark:border-white/10 dark:bg-black/20 focus:ring-primary focus:border-primary transition-all dark:text-white outline-none" />
                  </div>
                  <button type="submit" className="w-full h-12 rounded-full text-lg font-bold shadow-lg bg-primary hover:bg-primary/90 mt-6 transition-all active:scale-[0.98] text-white">
                    Next
                  </button>
                </form>
              </div>
            </div>

            {/* OTP Verification View */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${view === 'otp-verification' ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}>
              <div className="max-w-md mx-auto w-full">
                <button onClick={() => setView('forgot-password')} className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 group transition-all">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-black dark:text-white mb-2 tracking-tight">Verify Identity</h2>
                  <p className="text-subtext-light dark:text-subtext-dark">Enter the 6-digit code sent to your email.</p>
                </div>
                <form className="space-y-6" onSubmit={handleOtpSubmit}>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 text-center text-xl font-bold bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10 focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    ))}
                  </div>
                  <button type="submit" className="w-full h-12 rounded-full text-lg font-bold shadow-lg bg-primary hover:bg-primary/90 mt-4 transition-all active:scale-[0.98] text-white">
                    Verify
                  </button>
                  <div className="text-center">
                    <button type="button" className="text-sm font-bold text-primary hover:underline">Resend code</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Auto Scrolling Posts (Perfect Seamless Loop) */}
        <div className="hidden lg:block lg:w-[60%] xl:w-[65%] h-full bg-transparent overflow-hidden relative">
          <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 px-4">
            {/* Left Column Scroller */}
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-up flex flex-col gap-6">
                {leftScrollerPosts.map((post, idx) => (
                  <PostCard key={`left-${post.id}-${idx}`} post={post} />
                ))}
              </div>
            </div>
            {/* Right Column Scroller */}
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-down flex flex-col gap-6">
                {rightScrollerPosts.map((post, idx) => (
                  <PostCard key={`right-${post.id}-${idx}`} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
