import { Menu } from "lucide-react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";


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
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2 bg-base-100 w-40 z-1">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    )
}
