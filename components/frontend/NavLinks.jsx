'use client'

import { navLinks } from "@/configs/navlinks"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavLinks = () => {
    const pathname = usePathname();

    return (
        <ul className="menu menu-horizontal px-1 gap-10">
            {
                navLinks.map(navLink => {
                    const isActive = pathname === navLink.href;

                    return (
                        <Link
                            key={navLink.id}
                            href={navLink.href}
                            className={`inline-block relative pb-1 ${isActive
                                    ? 'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-9 after:h-0.5 after:bg-primary'
                                    : ''
                                }`}
                        >
                            {navLink.label}
                        </Link>
                    )
                })
            }
        </ul>
    )
}

export const MobileNavLinks = ({ setChecked }) => {
    const pathname = usePathname();

    return (
        <ul className="menu w-full px-1 gap-1">
            {
                navLinks.map(navLink => {
                    const isActive = pathname === navLink.href;

                    return (
                        <li key={navLink.id} className="w-full">
                            <Link
                                href={navLink.href}
                                className={`w-full ${isActive
                                    ? 'bg-primary text-primary-content'
                                    : 'hover:bg-base-300'
                                    }`}
                                onClick={() => setChecked(false)}
                            >
                                {navLink.label}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}
