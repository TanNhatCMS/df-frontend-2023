// Table.js
import React from 'react';

const Table = ({ books, deleteBook }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                            <button onClick={() => deleteBook(book.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
