'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookType } from '../../../../model/Types';
import BookManager from '../../../../utils/BookManager';
import { Modal } from '../../../components/Modal';
import CustomNotFound from '../../../not-found';
import NotificationManager from '../../../../utils/NotificationManager';
import { Toaster } from '../../../components/common/Toaster';
import { Notification } from '../../../hooks/Notification';

export default function ShowBookPage({ params: { id } }) {
  const router = useRouter();
  const [book, setBook] = useState<BookType | undefined>(undefined);
  const { toaster, showToast, clearToast } = Notification();

  const fetchBook = async (bookId: string) => {
    try {
      const fetchedBook = await BookManager.find(bookId);
      setBook(fetchedBook.data);
    } catch (error) {
      NotificationManager.create({
        category: 'error',
        message: error,
      });
    }
  };

  const onChange = (book: BookType) => {
    setBook(book);
  };

  const onSubmit = async () => {
    if (!book) return;
    try {
      const response = await BookManager.update(book);
      if (response.status) {
        NotificationManager.create({
          category: 'success',
          message: response.message,
        });
        router.replace('/');
      } else {
        NotificationManager.create({
          category: 'error',
          message: response.message,
        });
        showToast();
      }
    } catch (error) {
      NotificationManager.create({
        category: 'error',
        message: error,
      });
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  if (book === undefined) return <CustomNotFound />;
  return (
    <>
      {toaster && <Toaster toaster={toaster} clearToast={clearToast} />}
      <section className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-xl tracking-tight font-extrabold  text-gray-900 dark:text-white">
              Book {book.id} Edit:
            </h2>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              X
            </Link>
            <Link
              href="/books/new"
              className="flex items-center justify-center text-white bg-red-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Add Book
            </Link>
          </div>
        </div>
        <div className="space-y-3 md:space-y-0 md:space-x-4 p-4">
          <Modal
            bookData={book}
            onSubmit={onSubmit}
            disableEdit={false}
            onChange={onChange}
          />
        </div>
      </section>
    </>
  );
}
