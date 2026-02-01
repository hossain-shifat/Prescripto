'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

export default function useTheme() {
    const [theme, setTheme] = useState(() => {
        // Initialize from localStorage to prevent flash
        if (typeof window !== 'undefined') {
            return localStorage.getItem(STORAGE_KEY) || 'prescripto-light'
        }
        return 'prescripto-light'
    })
    const [mounted, setMounted] = useState(false)

    // Load theme on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const initialTheme = storedTheme || (prefersDark ? 'prescripto-dark' : 'prescripto-light')

        setTheme(initialTheme)
        document.documentElement.setAttribute('data-theme', initialTheme)
        setMounted(true)
    }, [])

    // Apply theme changes
    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute('data-theme', theme)
            localStorage.setItem(STORAGE_KEY, theme)
        }
    }, [theme, mounted])

    // Toggle theme
    const toggleTheme = () => {
        setTheme(prev => prev === 'prescripto-light' ? 'prescripto-dark' : 'prescripto-light')
    }

    return {
        theme,
        toggleTheme,
        mounted,
    }
}
