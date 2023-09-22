import React, { useState } from 'react';
import styles from './Notification.module.css';

function Notification() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    Notification.showNotification = (message) => {
        setMessage(message);
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    return (
        <div>
            {isVisible && (
                <div className={`${styles["notification"]}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Notification;
