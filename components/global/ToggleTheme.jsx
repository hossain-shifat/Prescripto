'use client'
import useTheme from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {

    const { theme, toggleTheme } = useTheme()
    return (
        <button onClick={toggleTheme} className="btn btn-square">
            {
                theme === 'light'
                    ?
                    <Moon size={20} />
                    :
                    <Sun size={20} />
            }
        </button>
    );
}

export default ToggleTheme;
