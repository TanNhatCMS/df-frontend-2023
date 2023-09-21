import React from 'react';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="container-modal">
            <div className="modal">
                <button className="close-btn" onClick={onClose}>
                    <span className="close-icon">X</span>
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
