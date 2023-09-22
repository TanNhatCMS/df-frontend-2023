import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';

function Notification() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    }, [notification]);

    Notification.showSuccessNotification = (message) => {
        setNotification({ message, isError: false });
    };

    Notification.showErrorNotification = (message) => {
        setNotification({ message, isError: true });
    };

    return (
        <div>
            {notification && (
                <div className={`${styles["notification"]} ${notification.isError ? styles["error"] : styles["success"]}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default Notification;
