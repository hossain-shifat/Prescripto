'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase/client';
import { FirebaseError } from 'firebase/app';
import { sendEmailVerification } from 'firebase/auth';

const cooldownDuration = 30;

export default function VerifyAccountPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const source = searchParams.get('from');
    const emailParam = searchParams.get('email') ?? '';

    const [statusMessage, setStatusMessage] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    const userEmail = auth.currentUser?.email ?? emailParam;
    const displayEmail = userEmail || 'your email address';

    useEffect(() => {
        if (source === 'register') {
            setStatusMessage('We just sent a verification link. Please check your inbox.');
        } else {
            setStatusMessage('');
        }
    }, [source]);

    useEffect(() => {
        if (cooldown <= 0) {
            return undefined;
        }

        const timer = setTimeout(() => {
            setCooldown((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleResend = async () => {
        if (!auth.currentUser) {
            setFirebaseError('Please sign in again to resend the verification email.');
            return;
        }

        setIsSending(true);
        setFirebaseError('');

        try {
            await sendEmailVerification(auth.currentUser);
            setStatusMessage(`A fresh verification link was sent to ${displayEmail}.`);
            setCooldown(cooldownDuration);
        } catch (error) {
            if (error instanceof FirebaseError) {
                setFirebaseError(error.message);
            } else {
                setFirebaseError('Unable to resend the email right now. Please try again later.');
            }
        } finally {
            setIsSending(false);
        }
    };

    const handleContinue = async () => {
        if (!auth.currentUser) {
            router.push('/login');
            return;
        }

        setIsChecking(true);
        setFirebaseError('');

        try {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                router.push('/');
                return;
            }
            setFirebaseError('Your email is still not verified. Check the link we sent and refresh.');
        } catch (error) {
            if (error instanceof FirebaseError) {
                setFirebaseError(error.message);
            } else {
                setFirebaseError('Unable to refresh verification status. Please try again.');
            }
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="w-full max-w-110 bg-base-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 animate-slideUp relative overflow-hidden">
                <div className="corner-decoration corner-top-left" />
                <div className="corner-decoration corner-top-right" />
                <div className="corner-decoration corner-bottom-left" />
                <div className="corner-decoration corner-bottom-right" />

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                <svg className="absolute top-6 right-6 w-16 h-16 opacity-[0.06]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                </svg>
                <svg className="absolute bottom-6 left-6 w-14 h-14 opacity-[0.06]" viewBox="0 0 100 100">
                    <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <path d="M50 25 L75 75 L25 75 Z" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                </svg>

                <div className="floating-dot" style={{ top: '18%', right: '12%' }} />
                <div className="floating-dot" style={{ bottom: '12%', left: '14%', animationDelay: '1s' }} />
                <div className="floating-dot" style={{ top: '52%', left: '8%', animationDelay: '1.8s' }} />

                <div className="text-center mb-6">
                    <h1 className="text-[28px] font-semibold text-base-content mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-sm text-[#6b7280]">
                        {source === 'register'
                            ? 'We just created your account and emailed you a confirmation link.'
                            : 'Please click the verification link in the email we just sent.'}
                    </p>
                </div>

                <div className="text-center mb-6 space-y-2">
                    <p className="text-sm text-[#374151]">We sent a message to</p>
                    <p className="text-base font-semibold text-base-content">{displayEmail}</p>
                </div>

                {statusMessage && (
                    <div className="mb-4 rounded-lg border border-[#dbeafe] bg-[#eff6ff] px-4 py-2 text-sm font-medium text-[#1d4ed8]">
                        {statusMessage}
                    </div>
                )}

                {firebaseError && (
                    <div className="mb-4 rounded-lg border border-[#fecaca] bg-[#fff1f2] px-4 py-2 text-sm font-medium text-[#b91c1c]">
                        {firebaseError}
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={handleResend}
                        disabled={isSending || cooldown > 0}
                        aria-busy={isSending}
                        className={`w-full py-3 bg-primary text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0 ${isSending || cooldown > 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSending
                            ? 'Resending link...'
                            : cooldown > 0
                                ? `Retry in ${cooldown}s`
                                : 'Resend verification email'}
                    </button>

                    <button
                        onClick={handleContinue}
                        disabled={isChecking}
                        className={`w-full py-3 border-[1.5px] border-[#667eea] text-[#667eea] bg-transparent rounded-lg text-[15px] font-semibold cursor-pointer transition-all hover:bg-[#667eea] hover:text-white ${isChecking ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isChecking ? 'Checking status...' : 'I already verified'}
                    </button>

                    <Link
                        href="/login"
                        className="block text-center text-sm text-[#667eea] hover:text-[#5568d3] font-semibold hover:underline transition-colors"
                    >
                        Back to Login
                    </Link>
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
                    0%,
                    100% {
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
