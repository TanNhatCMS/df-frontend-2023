import { FC } from 'react';
import Book from './ItemBook';
import { BookStoreType } from '../../model/Types';
import { Header } from './Header';
import { Footer } from './Footer';

interface BookListProps {
  bookStore: BookStoreType;
}

export const Table: FC<BookListProps> = ({ bookStore }) => {
  return (
    <div id="books">
      <Header />
      <div className="min-h-[345px] overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Author
              </th>
              <th scope="col" className="px-4 py-3">
                Topic
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookStore.data.map((book) => (
              <Book book={book} key={book.id} />
            ))}
          </tbody>
        </table>
      </div>
      <Footer
        page={bookStore.page}
        perPage={bookStore.perPage}
        total={bookStore.total}
        totalPages={bookStore.totalPages}
      />
    </div>
  );
};
