import React from 'react'
import './Switch.css'
import { TypeButtonSwitch } from '../../../utils/types'

export const Switch = ({
  isOn,
  handleToggle,
  colorOne,
  colorBtnOne,
  colorTwo,
  colorBtnTwo,
  label,
}: TypeButtonSwitch) => {
  return (
    <div id="toggleWrapper">
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor="switch"
      >
        <input
          checked={isOn}
          onChange={handleToggle}
          className="switch-checkbox"
          id="switch"
          type="checkbox"
        />
        <span
          className="switch-button"
          style={{ background: isOn ? colorBtnOne : colorBtnTwo }}
        />
      </label>
      <p>{label}</p>
    </div>
  )
}

export default Switch
