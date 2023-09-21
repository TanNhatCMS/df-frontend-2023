import React from 'react';

function Header({ onLanguageChange, onThemeChange }) {
    return (
        <header className="header">
            <h1>Book<span>Library</span></h1>
            <div className="theme-toggle">
                <span className="theme-label">Dark Mode</span>
                <label className="switch">
                    <input type="checkbox" onClick={onThemeChange} />
                    <span className="slider round"></span>
                </label>
            </div>
        </header>
    );
}

export default Header;
