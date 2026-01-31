'use client'
import { useEffect, useState } from "react"

export default function useTheme() {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const root = window.document.documentElement
        root.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return { theme, toggleTheme }
}
