import React from "react";

function About() {
  return (
    <div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl font-mono">About</h1>
        {/*Description of page (visible to users*/}
        <h2 className="text-center">
        BookMe is a company specialising in providing any service you want!
        <br /> At BookMe we are determined to offer world class services from our workers to our customers.
        <br /> Our session times are flexible and allow you to choose any day or hour of the week.</h2>
      </div>
    </div>
  );
}

export default About;
