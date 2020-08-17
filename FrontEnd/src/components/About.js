import React from "react";

function About() {
  return (
    <div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl font-mono">About</h1>
        {/*Description of page (visible to users*/}
        <br />
        <h2 className="text-center">Welcome to Book.com.
        <br /> Here, as a customer, you can easily book a service simply with the touch of a button!
        <br /> If you own a business, you can customise your availability so customers can easily book your services!</h2>
      </div>
    </div>
  );
}

export default About;
