'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useNotifications } from '@/context/NotificationContext';

export default function SocialLogin({
    label = 'Continue with Google',
    redirectTo = '/',
    className = '',
    onSuccess,
}) {
    const router = useRouter();
    const { addNotification } = useNotifications();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSocialLogin = async () => {
        setIsLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const credential = await signInWithPopup(auth, provider);

            addNotification({
                title: 'Signed in with Google',
                description: credential.user.email ?? 'Google account',
                type: 'success',
            });

            await onSuccess?.(credential.user);
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (loginError) {
            console.error('Google sign-in failed', loginError);
            setError(
                loginError?.message ??
                    'Unable to sign in with Google right now. Please try again later.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`space-y-1 ${className}`}>
            <button
                type="button"
                className="btn btn-outline w-full gap-3 justify-center border-[#d1d5db] text-base-content transition hover:border-base-content"
                onClick={handleSocialLogin}
                disabled={isLoading}
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                        <path
                            d="M12 11.5v2.2h3.4c-.2 1-.9 1.9-1.9 2.5l3 2.3c1.7-1.6 2.7-4 2.7-6.7 0-.6-.1-1.2-.2-1.7H12Z"
                            fill="#4285F4"
                        />
                        <path
                            d="M8 13.8c-.3-.8-.3-1.6 0-2.4V9.2H5v3.9c0 1.7.7 3.3 1.8 4.4l2.4-3.7Z"
                            fill="#34A853"
                        />
                        <path
                            d="M12 18c1.4 0 2.6-.5 3.6-1.4l-3-2.3c-.4.3-1 .5-1.6.5-1.1 0-2-.5-2.6-1.2h-2.4v3.7c1.2 1.2 2.9 2 4.7 2Z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M5 8.6h2.9C8 7.5 9.9 6.6 12 6.6c1.4 0 2.7.5 3.6 1.3l2.6-2.6C16.7 3.6 14.5 2.6 12 2.6c-2.6 0-4.8 1-6.4 2.7L5 8.6Z"
                            fill="#EA4335"
                        />
                    </svg>
                </span>
                <span>{isLoading ? 'Signing in...' : label}</span>
            </button>
            {error && <p className="text-xs text-error">{error}</p>}
        </div>
    );
}
