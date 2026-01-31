'use client'
import { LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import { MobileNavLinks } from "./Links";
import Image from "next/image";

export default function Sidebar() {
    const [checked, setChecked] = useState(false)
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
                    <div className="p-3 py-4 -mx-3">
                        <div className="divider m-0 -mx-4" />
                        <div className="flex gap-3 items-center justify-between">
                            <div className="flex gap-3 items-center min-w-0">
                                <div className="shrink-0">
                                    <Image
                                        className="w-12 h-12 rounded-full object-cover"
                                        width={48}
                                        height={48}
                                        src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                                        alt="profile"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="font-bold text-base truncate">Hossain-Shifat</h1>
                                    <p className="text-sm truncate">hossainshifat222@gmail.com</p>
                                </div>
                            </div>
                            <button className="btn btn-ghost text-error hover:bg-error/10 shrink-0">
                                <LogOut size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
