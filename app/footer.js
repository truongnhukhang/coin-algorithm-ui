export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="px-4">
          <ul className="flex flex-row text-lg font-light">
            <li className="my-2 basis-1/4">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                href="#"
              >
                FAQ
              </a>
            </li>
            <li className="my-2 basis-1/4">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                href="#"
              >
                Configuration
              </a>
            </li>
            <li className="my-2 basis-1/4">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                href="#"
              >
                Github
              </a>
            </li>
            <li className="my-2 basis-1/4">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                href="#"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
