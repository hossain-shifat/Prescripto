'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { auth } from '@/lib/firebase/client';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { buildVerificationActionCodeSettings } from '@/lib/firebase/actionCode';
import { persistUserProfile } from '@/lib/api/users';

const getRegisterErrorMessage = (error) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'An account already exists with this email.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Use a stronger password (at least 8 characters).';
        case 'auth/operation-not-allowed':
            return 'Email/password sign-up is disabled in Firebase.';
        default:
            return error.message;
    }
};

const IMGBB_UPLOAD_ENDPOINT = 'https://api.imgbb.com/1/upload';
const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const readFileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const uploadImageToImgbb = async (file) => {
    if (!file || !imgbbKey) {
        return '';
    }

    const dataUrl = await readFileToDataUrl(file);
    const [, payload] = (dataUrl ?? '').split(',');

    if (!payload) {
        throw new Error('Unable to process the selected image.');
    }

    const formData = new FormData();
    formData.append('image', payload);

    const response = await fetch(`${IMGBB_UPLOAD_ENDPOINT}?key=${encodeURIComponent(imgbbKey)}`, {
        method: 'POST',
        body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json || !json.success) {
        throw new Error(json?.error?.message ?? 'Image upload failed.');
    }

    return json.data?.url ?? '';
};

const formatPhoneNumberForStorage = (value = '') => {
    const digits = value.replace(/[^0-9]/g, '');
    if (!digits) {
        return '';
    }
    return `+880${digits}`;
};

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            role: 'user',
        },
    });

    const fullName = watch('fullName');

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setProfileImage(null);
            setImagePreview(null);
            return;
        }

        setProfileImage(file);
        try {
            const preview = await readFileToDataUrl(file);
            setImagePreview(preview);
        } catch (error) {
            console.error('Unable to preview image', error);
            setImagePreview(null);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setFirebaseError('');

        let photoUrl = '';
        if (profileImage) {
            try {
                photoUrl = await uploadImageToImgbb(profileImage);
            } catch (uploadError) {
                setFirebaseError(uploadError.message ?? 'Unable to upload the profile image right now.');
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);

            const profileUpdates = {};
            if (data.fullName?.trim()) {
                profileUpdates.displayName = data.fullName.trim();
            }
            if (photoUrl) {
                profileUpdates.photoURL = photoUrl;
            }

            if (Object.keys(profileUpdates).length > 0) {
                await updateProfile(credential.user, profileUpdates);
            }

            const accountCreationTime = credential.user.metadata?.creationTime ?? new Date().toISOString();
            await persistUserProfile({
                uid: credential.user.uid,
                email: data.email,
                fullName: data.fullName?.trim() ?? '',
                phone: formatPhoneNumberForStorage(data.phone),
                role: data.role ?? 'user',
                photoUrl,
                accountCreatedAt: accountCreationTime,
            });

            const actionCodeSettings = buildVerificationActionCodeSettings({
                email: data.email,
                source: 'register',
            });

            await sendEmailVerification(credential.user, actionCodeSettings);
            router.push(`/verify?email=${encodeURIComponent(data.email)}&from=register`);
        } catch (error) {
            if (error instanceof FirebaseError) {
                setFirebaseError(getRegisterErrorMessage(error));
            } else {
                setFirebaseError(
                    error?.message ?? 'We had trouble creating your account. Please try again later.',
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInitial = () => {
        if (fullName && fullName.trim().length > 0) {
            return fullName.trim().charAt(0).toUpperCase();
        }
        return '👤';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="w-full max-w-110 bg-base-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 animate-slideUp relative overflow-hidden">
                {/* Corner Decorative Elements */}
                <div className="corner-decoration corner-top-left"></div>
                <div className="corner-decoration corner-top-right"></div>
                <div className="corner-decoration corner-bottom-left"></div>
                <div className="corner-decoration corner-bottom-right"></div>

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

                {/* Decorative SVG Elements */}
                <svg className="absolute top-6 right-6 w-16 h-16 opacity-[0.06]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                </svg>

                <svg className="absolute bottom-6 left-6 w-14 h-14 opacity-[0.06]" viewBox="0 0 100 100">
                    <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                    <path d="M50 25 L75 75 L25 75 Z" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                </svg>

                {/* Floating Dots */}
                <div className="floating-dot" style={{ top: '15%', right: '12%' }}></div>
                <div className="floating-dot" style={{ top: '75%', right: '8%', animationDelay: '1s' }}></div>
                <div className="floating-dot" style={{ top: '25%', left: '10%', animationDelay: '2s' }}></div>

                {/* Header */}
                <div className="text-center mb-6 relative z-10">
                    <h1 className="text-[28px] font-semibold text-base-content mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-[#6b7280]">
                        Please sign up to book appointment
                    </p>
                </div>

                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-6 relative z-10">
                    <div className="relative mb-2">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-[#764ba2] to-primary flex items-center justify-center overflow-hidden border-[3px] border-base-200 shadow-[0_3px_10px_rgba(0,0,0,0.1)] relative">
                            {/* Profile ring decoration */}
                            <div className="profile-ring"></div>

                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt="Profile preview"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-[32px] text-white font-light relative z-10">
                                    {getInitial()}
                                </span>
                            )}
                        </div>
                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-0 right-0 w-7 h-7 bg-primary hover:bg-[oklch(58% 0.212 273.52)] rounded-full flex items-center justify-center cursor-pointer shadow-[0_2px_6px_rgba(102,126,234,0.4)] transition-all hover:scale-110"
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
                    <span className="text-xs text-primary font-medium">
                        Upload Photo
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-10">
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.fullName ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
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
                            className={`w-full px-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.email ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
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
                                placeholder=" 1XXX-XXXXXX"
                                className={`w-full pl-12.5 pr-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.phone ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
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

                    {/* Role */}
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-[#374151] mb-1.5">
                            Role
                        </label>
                        <select
                            id="role"
                            className={`w-full px-4 py-2.5 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] appearance-none ${errors.role ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
                                }`}
                            {...register('role', {
                                required: 'Please select a role',
                            })}
                        >
                            <option value="user">User</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        {errors.role && (
                            <span className="block text-xs text-[#ef4444] mt-1">
                                {errors.role.message}
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
                                className={`w-full px-4 py-2.5 pr-12 border-[1.5px] rounded-lg text-sm text-base-content transition-all bg-base-200 focus:bg-base-100 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] placeholder:text-[#9ca3af] ${errors.password ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e5e7eb]'
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
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-primary transition-colors cursor-pointer"
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
                        className={`w-full py-3 mt-1 bg-primary text-white border-none rounded-lg text-[15px] font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0 relative overflow-hidden group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        <span className="relative z-10">{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
                        <div className="button-shine"></div>
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-5">
                        <p className="text-sm text-[#6b7280]">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-primary hover:text-[oklch(58% 0.212 273.52)] font-semibold hover:underline transition-colors"
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        /* Corner Decorations */
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

        /* Floating Dots */
        .floating-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: oklch(60.92% 0.212 273.52);
          border-radius: 50%;
          opacity: 0.15;
          animation: float 3s ease-in-out infinite;
        }

        /* Profile Ring Animation */
        .profile-ring {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 2px solid oklch(60.92% 0.212 273.52);
          border-radius: 50%;
          opacity: 0.3;
          animation: rotate 8s linear infinite;
          border-top-color: transparent;
          border-right-color: transparent;
        }

        /* Button Shine Effect */
        .button-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s;
        }

        button:hover .button-shine {
          animation: shine 1.5s ease-in-out infinite;
          opacity: 1;
        }
      `}</style>
        </div>
    );
}

