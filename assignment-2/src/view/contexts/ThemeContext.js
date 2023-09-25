import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STYLES } from '../../utils/config'
import { getThemeMode } from '../../utils/functions'

export const styleContext = createContext()

export function useTheme() {
    const context = useContext(styleContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeContext')
    }
    return context
}

export const ThemeContext = ({ children }) => {
    const [colorMode, SetColorMode] = useState(getThemeMode)

    const updateThemeMode = (theme) => {
        const root = window.document.documentElement
        root.style.setProperty(
            '--color-text',
            theme === 'light' ? STYLES.light.text : STYLES.dark.text,
        )
        root.style.setProperty(
            '--color-background',
            theme === 'light' ? STYLES.light.background : STYLES.dark.background,
        )
        root.style.setProperty(
            '--color-primary',
            theme === 'light' ? STYLES.light.primary : STYLES.dark.primary,
        )
        root.style.setProperty(
            '--color-toggle-background',
            theme === 'light' ? STYLES.light.toggle : STYLES.dark.toggle,
        )
    }

    const setThemeMode = (theme) => {
        SetColorMode(theme)
        localStorage.setItem('theme', theme)
        updateThemeMode(theme)
    }

    useEffect(() => {
        updateThemeMode(colorMode)
    }, [])

    const context = useMemo(
        () => ({
            colorMode,
            setThemeMode,
        }),
        [colorMode],
    )

    return <styleContext.Provider value={context}>{children}</styleContext.Provider>
}

export default ThemeContext
