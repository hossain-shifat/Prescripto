'use client'
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";

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
            <div className="drawer-side">
                <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu min-h-full bg-base-200  w-80 p-4">
                    <div className="flex flex-col gap-5">
                        <div className="border-b-2 border-gray-200 py-2.5 flex justify-between items-center">
                            <Logo />
                            <button className="drawer-close" onClick={() => setChecked(false)}><X /></button>
                        </div>
                        <div>
                            <ul>
                                <li><a>Sidebar Item 1</a></li>
                                <li><a>Sidebar Item 2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
