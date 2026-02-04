'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert('Login successful! 🎉');
        // Here you would typically send the data to your API
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="w-full max-w-110 bg-base-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 animate-slideUp">
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
                            className={`w-full px-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-[#fafafa] focus:bg-white focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.email ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
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
                                className={`w-full px-4 py-2.5 pr-12 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-[#fafafa] focus:bg-white focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.password ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-1 bg-primary text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0"
                    >
                        Login
                    </button>

                    {/* Register Link */}
                    <div className="text-center mt-5">
                        <p className="text-sm text-[#6b7280]">
                            Don't have an account?{' '}
                            <a
                                href="/register"
                                className="text-[#667eea] hover:text-[#5568d3] font-semibold hover:underline transition-colors"
                            >
                                Create Account
                            </a>
                        </p>
                    </div>
                </form>
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
