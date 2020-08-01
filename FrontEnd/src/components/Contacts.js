import React from "react";

function Contacts() {
  return (
    <div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl font-mono">Contact Us</h1>
        <form className="max-w-xl mx-auto px-5 py-5">
          <div className="flex items-center py-2">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder="Full Name"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center py-2">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="email"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <div className="flex items-center py-2">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder="Company Name"
              aria-label="Company Name"
            />
          </div>
          <div className="flex items-center py-2">
            <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="textarea"
              placeholder="Message"
              aria-label="Message"
            />
          </div>
          <div className="md:flex md:items-center pt-4 pl-5">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contacts;
