import React, { useState } from 'react';

function ModalAddEdit({ isOpen, onClose, onSave, book }) {
    const [formData, setFormData] = useState(book);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-header">
                <h1>{book ? 'Edit Book' : 'Add Book'}</h1>
            </div>
            <div className="modal-body">
                <form onSubmit={(e) => onSave(e, formData)}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group footer-form">
                        <button type="submit" className="btn btn-success">
                            {book ? 'Save' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalAddEdit;
