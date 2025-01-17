'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookType } from '../../../model/Types';
import { Modal } from '../../components/Modal';
import BookManager from '../../../utils/BookManager';
import NotificationManager from '../../../utils/NotificationManager';
import { Notification } from '../../hooks/Notification';
import { Toaster } from '../../components/common/Toaster';

export default function NewBookPage() {
  const router = useRouter();
  const defaultBook: BookType = {
    id: '',
    createdAt: 0,
    name: '',
    author: '',
    topic: '',
  };
  const [book, setBook] = useState<BookType>(defaultBook);

  const onChange = (book: BookType) => {
    setBook(book);
  };

  const { toaster, showToast, clearToast } = Notification();
  const onSubmit = async () => {
    try {
      const response = await BookManager.create(book);
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
      console.error('Error creating book:', error);
    }
  };

  return (
    <>
      {toaster && <Toaster toaster={toaster} clearToast={clearToast} />}
      <section className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-xl tracking-tight font-extrabold  text-gray-900 dark:text-white">
              Add Book
            </h2>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center justify-center text-white bg-red-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              X
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
