import React from "react";
import styles from "./MobileNavMenu.module.css";

const MobileNavMenu = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles["mobile-nav-menu"]} ${isOpen ? "open" : ""}`}>
            <ul>
                {/* Thêm các mục menu và xử lý sự kiện khi mục được nhấn */}
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                {/* ... */}
            </ul>
            <button className={`${styles["close-button"]}`} onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default MobileNavMenu;
