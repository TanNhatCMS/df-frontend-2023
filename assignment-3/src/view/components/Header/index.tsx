import React, { useContext } from 'react'
import { Switch } from '../Switch/Switch'
import { ContextTheme } from '../../../utils/context/ContextTheme'
import user from '../../../assets/images/user.png'

function Header() {
  const { theme, setTheme } = useContext(ContextTheme)
  function changeTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    if (theme === 'light') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }
  return (
    <header className={theme === 'dark' ? 'dark' : undefined}>
      <h1>Bookstore</h1>
      <div className="user-info">
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
      </div>
    </header>
  )
}

export default Header
