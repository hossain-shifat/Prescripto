'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const fullName = watch('fullName');

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        console.log({
            ...data,
            profileImage: profileImage,
        });
        alert('Account created successfully! 🎉');
        // Here you would typically send the data to your API
    };

    const getInitial = () => {
        if (fullName && fullName.trim().length > 0) {
            return fullName.trim().charAt(0).toUpperCase();
        }
        return '👤';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5 ">
            <div className="w-full max-w-110 bg-base-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 animate-slideUp">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-[28px] font-semibold text-base-content mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-[#6b7280]">
                        Please sign up to book appointment
                    </p>
                </div>

                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-2">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center overflow-hidden border-[3px] border-[#f3f4f6] shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt="Profile preview"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-[32px] text-white font-light">
                                    {getInitial()}
                                </span>
                            )}
                        </div>
                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-0 right-0 w-7 h-7 bg-[#667eea] hover:bg-[#5568d3] rounded-full flex items-center justify-center cursor-pointer shadow-[0_2px_6px_rgba(102,126,234,0.4)] transition-all hover:scale-110"
                        >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                                <path d="M12 5v14m7-7H5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <span className="text-xs text-[#667eea] font-medium">
                        Upload Photo
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.fullName ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
                                }`}
                            {...register('fullName', {
                                required: 'Please enter your full name',
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters',
                                },
                            })}
                        />
                        {errors.fullName && (
                            <span className="block text-xs text-[#ef4444] mt-1">
                                {errors.fullName.message}
                            </span>
                        )}
                    </div>

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

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] font-medium pointer-events-none">
                                +880
                            </span>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="1XXX-XXXXXX"
                                className={`w-full pl-12.5 pr-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.phone ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
                                    }`}
                                {...register('phone', {
                                    required: 'Please enter your phone number',
                                    validate: (value) => {
                                        const cleaned = value.replace(/[^0-9]/g, '');
                                        if (!cleaned.match(/^1[0-9]{9}$/)) {
                                            return 'Please enter a valid phone number';
                                        }
                                        return true;
                                    },
                                })}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/[^0-9]/g, '');
                                    if (value.length > 4) {
                                        value = value.slice(0, 4) + '-' + value.slice(4, 10);
                                    }
                                    setValue('phone', value, { shouldValidate: false });
                                }}
                            />
                        </div>
                        {errors.phone && (
                            <span className="block text-xs text-[#ef4444] mt-1">
                                {errors.phone.message}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Create a strong password"
                                className={`w-full px-4 py-2.5 pr-12 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.password ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
                                    }`}
                                {...register('password', {
                                    required: 'Please enter a password',
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-1 bg-primary text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-5">
                        <p className="text-sm text-[#6b7280]">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-[#667eea] hover:text-[#5568d3] font-semibold hover:underline transition-colors"
                            >
                                Login
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
