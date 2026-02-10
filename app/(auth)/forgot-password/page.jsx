'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '@/lib/firebase/client';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';

const getResetErrorMessage = (error) => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-not-found':
            return 'No account is registered with that email.';
        case 'auth/too-many-requests':
            return 'Too many reset attempts. Try again later.';
        default:
            return error.message;
    }
};

export default function ForgotPasswordPage() {
    const [emailSent, setEmailSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setFirebaseError('');

        try {
            await sendPasswordResetEmail(auth, data.email);
            setEmailSent(true);
        } catch (error) {
            if (error instanceof FirebaseError) {
                setFirebaseError(getResetErrorMessage(error));
            } else {
                setFirebaseError('Unable to send the reset link right now. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="w-full max-w-110 bg-base-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 animate-slideUp">
                {!emailSent ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-[28px] font-semibold text-base-content mb-2">
                                Forgot Password?
                            </h1>
                            <p className="text-sm text-[#6b7280]">
                                Enter your email to reset your password
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            {/* Email */}
                            <div className="mb-6">
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
                        {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
                    </button>

                            {/* Back to Login Link */}
                            <div className="text-center mt-5">
                                <p className="text-sm text-[#6b7280]">
                                    Remember your password?{' '}
                                    <a
                                        href="/login"
                                        className="text-[#667eea] hover:text-[#5568d3] font-semibold hover:underline transition-colors"
                                    >
                                        Back to Login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        {/* Success Message */}
                        <div className="text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>

                            <h1 className="text-[28px] font-semibold text-base-content mb-3">
                                Check Your Email
                            </h1>
                            <p className="text-sm text-[#6b7280] mb-8">
                                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                            </p>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => setEmailSent(false)}
                                    className="w-full py-3 bg-primary text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0"
                                >
                                    Resend Email
                                </button>

                                <a
                                    href="/login"
                                    className="block w-full py-3 bg-transparent text-[#667eea] border-[1.5px] border-[#667eea] rounded-lg text-[15px] font-semibold cursor-pointer transition-all hover:bg-[#667eea] hover:text-white"
                                >
                                    Back to Login
                                </a>
                            </div>
                        </div>
                    </>
                )}
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
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
        </div>
    );
}
