import { Menu } from "lucide-react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import ToggleTheme from "../global/ToggleTheme";
import { NavLinks } from "./NavLinks";


export default function Navbar() {
    return (
        <div className="navbar bg-base-200 shadow-sm px-4">
            <div className="navbar-start gap-5">
                <div className="lg:hidden">
                    <Sidebar />
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <NavLinks />
            </div>
            <div className="navbar-end">
                <ToggleTheme />
            </div>
        </div>
    )
}
