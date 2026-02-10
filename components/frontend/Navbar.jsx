'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Logo from './Logo';
import Sidebar from './Sidebar';
import ToggleTheme from '../global/ToggleTheme';
import { NavLinks } from './Links';
import Button from '../global/Button';
import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut(auth);
            setMenuOpen(false);
        } catch (error) {
            console.error('Unable to sign out', error);
        } finally {
            setIsSigningOut(false);
        }
    };

    const userLabel = user?.displayName?.trim() || user?.email?.split('@')[0] || 'Account';
    const avatar = user?.photoURL
        ? (
            <img
                src={user.photoURL}
                alt={userLabel}
                className="h-9 w-9 rounded-full object-cover"
            />
        )
        : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5F6FFF] text-sm font-semibold uppercase text-white">
                {userLabel.charAt(0)}
            </div>
        );

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-base-100 px-2 md:px-30">
            <div className="navbar border-b-2 border-base-300">
                <div className="navbar-start gap-5">
                    <div className="lg:hidden">
                        <Sidebar />
                    </div>
                    <Logo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <NavLinks />
                </div>
                <div className="navbar-end lg:gap-3">
                    <ToggleTheme />
                    {user ? (
                        <div ref={menuRef} className="relative hidden md:block">
                            <button
                                onClick={() => setMenuOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-full bg-base-200/70 px-3 py-1 text-sm font-semibold text-base-content transition hover:bg-base-200 focus:outline-none"
                                aria-expanded={menuOpen}
                            >
                                {avatar}
                                <span className="hidden md:block">{userLabel}</span>
                                <ChevronDown className={`h-4 w-4 transition ${menuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-base-100/80 p-1 shadow-[0_25px_60px_rgba(8,8,8,0.25)] backdrop-blur">
                                    <div className="space-y-1 rounded-xl bg-base-200/70 px-4 py-3 text-sm text-base-content shadow-inner">
                                        <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">Signed in as</p>
                                        <p className="font-semibold text-base-content">{user?.displayName || userLabel}</p>
                                        <p className="text-xs text-[#9ca3af]">{user?.email}</p>
                                    </div>
                                    <div className="mt-2 flex flex-col gap-1 rounded-xl bg-base-200/60 p-2 text-sm shadow-inner">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-base-content transition hover:bg-base-200/80"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <User className="h-4 w-4" />
                                            Profile page
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-base-content transition hover:bg-base-200/80"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            disabled={isSigningOut}
                                            className="flex items-center gap-2 rounded-lg btn-outline px-3 py-2 text-sm font-semibold text-error hover:bg-transparent transition disabled:opacity-70 btn btn-sm btn-error"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            {isSigningOut ? 'Signing out...' : 'Logout'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button text="Create account" smd={false} rounded href="/register" />
                    )}
                </div>
            </div>
        </div>
    );
}
