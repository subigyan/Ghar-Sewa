import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-white sm:p-6 border-t-4  ">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <a href="/" className="flex items-center">
            {/* <img
            src="/docs/images/logo.svg"
            className="mr-3 h-8"
            alt="GharSewa Logo"
          /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Ghar Sewa
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div className="sm:block hidden"></div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Useful Links
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a href="/" className="hover:underline ">
                  Ghar Sewa
                </a>
              </li>
              <li className="mb-4">
                <a href="/business" className="hover:underline ">
                  Ghar Sewa for Business
                </a>
              </li>
              <li className="mb-4">
                <a href="/business" className="hover:underline ">
                  About Ghar Sewa
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/subigyan"
                  className="hover:underline"
                >
                  Developer
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
              Contact
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">Sinamangal, Kathmandu, Nepal</li>
              <li className="mb-4">
                <a href="mailto:asubigyan@gmail.com">asubigyan@gmail.com</a>
              </li>
              <li className="mb-4">
                <a href="tel:01-4114641">01-4114641</a>
              </li>
              <li className="mb-4">
                <a href="tel:+977-9859999999">+977-9859999999</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="/" className="hover:underline">
            GharSewa
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            href="https://facebook.com/"
            className="text-gray-500 hover:text-gray-900 "
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook className="text-xl" />
          </a>
          <a
            href="https://instagram.com/"
            className="text-gray-500 hover:text-gray-900 "
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram className="text-xl" />
          </a>
          <a
            href="https://twitter.com/"
            className="text-gray-500 hover:text-gray-900 "
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
