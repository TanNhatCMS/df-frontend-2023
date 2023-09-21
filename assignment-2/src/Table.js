import React from 'react';

function Table({ bookList, onDeleteClick, onEditClick }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="column">Title</th>
                    <th className="column">Author</th>
                    <th className="column">Genre</th>
                    <th className="column">Year</th>
                    <th className="column">Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookList.map((book, index) => (
                    <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.year}</td>
                        <td>
                            <span className="edit-book" onClick={() => onEditClick(index)}>
                                Edit
                            </span>
                            <span className="delete-book" onClick={() => onDeleteClick(index)}>
                                Delete
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
