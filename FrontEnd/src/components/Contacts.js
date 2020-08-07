import React from "react";

function Contacts() {
  return (
    <div>
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
    </div>
  );
}

export default Contacts;
