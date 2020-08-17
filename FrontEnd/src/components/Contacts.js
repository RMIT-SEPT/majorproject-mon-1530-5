import React from "react";

function Contacts() {
  return (
    <div>
<<<<<<< HEAD
     <h1 className="text-center text-4xl py-5 ">Contact Us</h1>
    <div class="flex justify-evenly py-5">
      <div class="max-w-lg rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Our Contact Number</div>
          <p class="text-gray-700 text-base">
            If you have any questions, call the number below.
          </p>
        </div>
        <div class="px-6 py-4">
          <p class="font-bold text-xl mb-2">+61 045 689 345</p>
        </div>
      </div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Our Email</div>
          <p class="text-gray-700 text-base">
            If you want to drop us an email, here is the address below
          </p>
        </div>
        <div class="px-6 py-4">
          <p class="font-bold text-xl mb-2">Booking.com@example.com</p>
        </div>
      </div>
    </div>
=======
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
>>>>>>> master
    </div>
  );
}

export default Contacts;
