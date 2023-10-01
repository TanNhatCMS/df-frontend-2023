import React, { useMemo, useState } from 'react'
import BookShowPage from './view/pages/PageHome'
import Header from './view/components/Header/index'
import { ContextTheme } from './utils/context/ContextTheme'

function AppController() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light',
  )
  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return (
    <ContextTheme.Provider value={value}>
      <Header />
      <main className={theme === 'dark' ? 'dark' : undefined}>
        <BookShowPage />
      </main>
    </ContextTheme.Provider>
  )
}

export default AppController
