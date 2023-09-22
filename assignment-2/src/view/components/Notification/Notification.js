import React, { useState } from 'react';
import styles from './Notification.module.css';

function Notification() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    Notification.showSuccessNotification = (message) => {
        setMessage(message);
        setIsVisible(true);
        setIsError(false);

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    Notification.showErrorNotification = (message) => {
        setMessage(message);
        setIsVisible(true);
        setIsError(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    return (
        <div>
            {isVisible && (
                <div className={`${styles["notification"]} ${isError ? styles["error"] : styles["success"]}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Notification;
