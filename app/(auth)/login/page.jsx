'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useNotifications } from '@/context/NotificationContext';
import { auth } from '@/lib/firebase/client';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import SocialLogin from '@/components/global/SocialLogin';
import { persistUserProfile } from '@/lib/api/users';

const getFirebaseErrorMessage = (error) => {
    const code = error?.code;
    switch (code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-not-found':
            return 'No account found with that email address.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/too-many-requests':
            return 'Too many failed login attempts. Please try again later.';
        default:
            if (typeof error?.message === 'string' && error.message) {
                return error.message;
            }
            return 'Unable to sign in right now. Please try again later.';
    }
};

export default function LoginPage() {
    const { addNotification } = useNotifications();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const persistLoginActivity = async (user, method = 'email password') => {
        if (!user) {
            return;
        }

        try {
            await persistUserProfile({
                uid: user.uid,
                email: user.email,
                fullName: user.displayName ?? '',
                phone: user.phoneNumber ?? '',
                photoUrl: user.photoURL ?? '',
                accountCreatedAt: user.metadata?.creationTime,
                signInMethod: method,
                emailVerified: user.emailVerified,
            });
        } catch (error) {
            console.error('Error persisting login activity', error);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setFirebaseError('');

        try {
            const credential = await signInWithEmailAndPassword(auth, data.email, data.password);

            if (!credential.user.emailVerified) {
                await sendEmailVerification(credential.user);
                router.push(`/verify?email=${encodeURIComponent(data.email)}&from=login`);
                return;
            }

            await persistLoginActivity(credential.user, 'email password');
            addNotification({
                title: 'Signed in',
                description: `Logged in as ${credential.user.email}`,
                type: 'success',
            });

            router.push('/');
        } catch (error) {
            setFirebaseError(getFirebaseErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialLoginSuccess = async (user) => {
        await persistLoginActivity(user, 'google');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="w-full max-w-110 bg-base-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 animate-slideUp relative overflow-hidden">
                {/* Corner decorations */}
                <div className="corner-decoration corner-top-left" />
                <div className="corner-decoration corner-top-right" />
                <div className="corner-decoration corner-bottom-left" />
                <div className="corner-decoration corner-bottom-right" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                {/* Decorative SVG elements */}
                <svg className="absolute top-6 right-6 w-16 h-16 opacity-[0.06]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                </svg>
                <svg className="absolute bottom-6 left-6 w-14 h-14 opacity-[0.06]" viewBox="0 0 100 100">
                    <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <path d="M50 25 L75 75 L25 75 Z" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                </svg>

                {/* Floating dots */}
                <div className="floating-dot" style={{ top: '18%', right: '12%' }}></div>
                <div className="floating-dot" style={{ bottom: '12%', left: '14%', animationDelay: '1s' }}></div>
                <div className="floating-dot" style={{ top: '52%', left: '8%', animationDelay: '1.8s' }}></div>

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-[28px] font-semibold text-base-content mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-[#6b7280]">
                        Please login to your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            className={`w-full px-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.email ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
                                }`}
                            {...register('email', {
                                required: 'Please enter your email address',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="block text-xs text-[#ef4444] mt-1">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                className={`w-full px-4 py-2.5 pr-12 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.password ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
                                    }`}
                                {...register('password', {
                                    required: 'Please enter your password',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#667eea] transition-colors cursor-pointer"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    {showPassword ? (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                        {errors.password && (
                            <span className="block text-xs text-[#ef4444] mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right mb-6">
                        <a
                            href="/forgot-password"
                            className="text-sm text-[#667eea] hover:text-[#5568d3] font-medium hover:underline transition-colors"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {firebaseError && (
                        <div className="mb-4 rounded-lg border border-[#fecaca] bg-[#fff1f2] px-4 py-2 text-sm font-medium text-[#b91c1c]">
                            {firebaseError}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className={`w-full py-3 mt-1 bg-primary text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Register Link */}
                    <div className="text-center mt-5">
                        <p className="text-sm text-[#6b7280]">
                            Don&apos;t have an account?{' '}
                            <a
                                href="/register"
                                className="text-[#667eea] hover:text-[#5568d3] font-semibold hover:underline transition-colors"
                            >
                                Create Account
                            </a>
                        </p>
                    </div>
                </form>
                <div className="mt-6 space-y-3 text-center">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#9ca3af] px-6">
                        <span className="h-px flex-1 bg-base-200" />
                        <span>or</span>
                        <span className="h-px flex-1 bg-base-200" />
                    </div>
                    <div className="mx-auto w-full max-w-sm">
                        <SocialLogin redirectTo="/" onSuccess={handleSocialLoginSuccess} />
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .corner-decoration {
          position: absolute;
          width: 40px;
          height: 40px;
          opacity: 0.08;
        }

        .corner-top-left {
          top: 0;
          left: 0;
          border-top: 3px solid oklch(60.92% 0.212 273.52);
          border-left: 3px solid oklch(60.92% 0.212 273.52);
          border-top-left-radius: 1rem;
        }

        .corner-top-right {
          top: 0;
          right: 0;
          border-top: 3px solid oklch(60.92% 0.212 273.52);
          border-right: 3px solid oklch(60.92% 0.212 273.52);
          border-top-right-radius: 1rem;
        }

        .corner-bottom-left {
          bottom: 0;
          left: 0;
          border-bottom: 3px solid oklch(60.92% 0.212 273.52);
          border-left: 3px solid oklch(60.92% 0.212 273.52);
          border-bottom-left-radius: 1rem;
        }

        .corner-bottom-right {
          bottom: 0;
          right: 0;
          border-bottom: 3px solid oklch(60.92% 0.212 273.52);
          border-right: 3px solid oklch(60.92% 0.212 273.52);
          border-bottom-right-radius: 1rem;
        }

        .floating-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: oklch(60.92% 0.212 273.52);
          border-radius: 50%;
          opacity: 0.15;
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
