// AddBookForm.js
import React, { useState } from 'react';

const AddBookForm = ({ addBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author) {
            addBook({ title, author, id: Date.now() });
            setTitle('');
            setAuthor('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tác giả"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <button type="submit">Thêm sách</button>
        </form>
    );
};

export default AddBookForm;
