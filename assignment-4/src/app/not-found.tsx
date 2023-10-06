import Link from 'next/link';

export default function CustomNotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <h1 className="font-bold text-center text-[64px] text-gray-800 dark:text-white">
            404
          </h1>
          <div className="">
            <h2 className="my-2   text-center text-gray-800 font-bold text-2xl dark:text-white">
              Page not found
            </h2>
            <Link
              href="/"
              className="block  my-2 md py-4 px-8 text-center text-red-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            >
              &lt; Back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
