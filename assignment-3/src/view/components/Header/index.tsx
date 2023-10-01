import React, { useContext } from 'react'
import { Switch } from '../Switch/Switch'
import { ContextTheme } from '../../../utils/context/ContextTheme'
import user from '../../../assets/images/user.png'

function Header() {
  const { theme, setTheme } = useContext(ContextTheme)
  function changeTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }
  return (
    <header className={theme === 'dark' ? 'dark' : undefined}>
      <h1>Bookstore</h1>
      <Switch
        isOn={theme === 'dark'}
        handleToggle={() => changeTheme()}
        colorBtnTwo="#F28C38"
        colorTwo="#70e2fe"
        colorBtnOne="#F5F3CE"
        colorOne="#324c5c"
        label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      />

      <figure id="personal">
        <img src={user} alt="avatar" srcSet="" id="avatar" />
        <figcaption id="name">TânNhậtCMS</figcaption>
      </figure>
    </header>
  )
}

export default Header