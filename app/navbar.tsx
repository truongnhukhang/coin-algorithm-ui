import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="relative basic-1/4 h-auto ">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-72">
            <nav className="mt-10 px-6 ">
              <Link
                className="hover:text-gray-800 hover:bg-gray-100 
                flex items-center p-2 my-6 transition-colors 
                dark:hover:text-white dark:hover:bg-gray-600 duration-200  
                text-gray-600 dark:text-gray-400 rounded-lg "
                href="/grid/market-health"
              >
                <span className="mx-4 text-lg font-normal">Market Health</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <a
                className="hover:text-gray-800 hover:bg-gray-100 
                flex items-center p-2 my-6 transition-colors 
                dark:hover:text-white dark:hover:bg-gray-600 duration-200  
                text-gray-800 dark:text-gray-100 rounded-lg "
                href="#"
              >
                <span className="mx-4 text-lg font-normal">Signal List</span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                href="#"
              >
                <span className="mx-4 text-lg font-normal">Commerce</span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                href="#"
              >
                <span className="mx-4 text-lg font-normal">Setting</span>
                <span className="flex-grow text-right"></span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
