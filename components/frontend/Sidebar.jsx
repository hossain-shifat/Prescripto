'use client'
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { MobileNavLinks } from "./Links";
import Image from "next/image";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Sidebar() {
    const [checked, setChecked] = useState(false)
    const [user, setUser] = useState(null)
    const [signingOut, setSigningOut] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
        })
        return unsubscribe
    }, [])

    const handleSignOut = async () => {
        setSigningOut(true)
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Sidebar logout failed', error)
        } finally {
            setSigningOut(false)
        }
    }

    return (
        <div className="drawer drawer-start">
            <input id="my-drawer-5" type="checkbox" checked={checked} className="drawer-toggle" onChange={(e) => setChecked(e.target.checked)} />
            <div className="drawer-content">
                <label htmlFor="my-drawer-5" className="drawer-button btn-sm outline-none border-none hover:bg-transparent hover:shadow-none">
                    <Menu size={25} />
                </label>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu min-h-full bg-base-200 w-80 p-4 pb-0 flex flex-col justify-between">
                    <div className="flex flex-col">
                        <div className="py-1.5 flex justify-between items-center">
                            <Logo />
                            <button className="drawer-close text-primary" onClick={() => setChecked(false)}><X /></button>
                        </div>
                        <div className="divider my-0" />
                        <div>
                            <MobileNavLinks setChecked={setChecked} />
                        </div>
                    </div>
                    <div className="-mx-3">
                        <div className="divider m-0" />
                        {user ? (
                            <div className="flex items-center gap-3 rounded-2xl bg-base-100/80 p-3 shadow-inner">
                                <Link
                                    href="/profile"
                                    className="flex flex-1 items-center gap-3"
                                    onClick={() => setChecked(false)}
                                >
                                    <div className="shrink-0">
                                        <Image
                                            className="w-12 h-12 rounded-full object-cover"
                                            width={48}
                                            height={48}
                                            src={user.photoURL || "https://img.daisyui.com/images/profile/demo/gordon@192.webp"}
                                            alt={user.displayName || "Avatar"}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-base-content truncate">
                                            {user.displayName || user.email?.split("@")[0] || "Account"}
                                        </p>
                                        <p className="text-xs text-[#6b7280] truncate">{user.email}</p>
                                    </div>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="btn btn-ghost btn-sm text-error hover:bg-transparent bg-transparent border-none shadow-none px-2"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="text-sm text-[#6b7280]">
                                <p className="mb-2">Sign in to see personalized options.</p>
                                <Link
                                    href="/login"
                                    className="btn btn-sm btn-primary rounded-full px-3 text-xs uppercase tracking-[0.3em]"
                                    onClick={() => setChecked(false)}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
