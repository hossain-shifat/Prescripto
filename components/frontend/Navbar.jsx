import { Menu } from "lucide-react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import ToggleTheme from "../global/ToggleTheme";
import { NavLinks } from "./Links";
import Button from "../global/Button";


export default function Navbar() {
    return (
        <div className="navbar px-4 md:px-10 fixed top-0 left-0 right-0 z-50">
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
                <Button text='Create account' smd={false} rounded={true}/>
            </div>
        </div>
    )
}
