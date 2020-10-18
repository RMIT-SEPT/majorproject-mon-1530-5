import React from "react";

function Contacts() {
  return (
    <div>
     <h1 className="text-center text-4xl py-5 ">Contact Us</h1>
    <div className="flex justify-evenly py-5">
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Our Contact Number and Fax</div>
          <p className="text-gray-700 text-base">
            If you have any questions, call the number below.
          </p>
        </div>
        <div className="px-6 py-4">
          <p className="font-bold text-xl mb-2">Number: 0274 248 743</p>
          <p className="font-bold text-xl mb-2">Fax: +61 2 1234 5678</p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Our Email and Address</div>
          <p className="text-gray-700 text-base">
            If you want to drop us an email, here is the address below
          </p>
        </div>
        <div className="px-6 py-4">
          <p className="font-bold text-xl mb-2">Email: Booking.com@example.com</p>
          <p className="font-bold text-xl mb-2">Address: 123 Domain lane, Gembrook, 3783, Victoria</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contacts;
