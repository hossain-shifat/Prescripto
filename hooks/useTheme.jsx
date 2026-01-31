'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

export default function useTheme() {
    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false)

    // Load theme on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light')

        setTheme(initialTheme)
        document.documentElement.setAttribute('data-theme', initialTheme)
        setMounted(true)
    }, [])

    // Toggle theme
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'

        setTheme(nextTheme)
        localStorage.setItem(STORAGE_KEY, nextTheme)
        document.documentElement.setAttribute('data-theme', nextTheme)
    }

    return {
        theme,
        toggleTheme,
        mounted,
    }
}
