import React from "react";
import step1 from '../images/1.png';
import step2 from '../images/2.png';
import step3 from '../images/3.png';
import step4 from '../images/4.png';

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
        <br />
        <h3 className="text-center text-2xl font-mono">How To Book</h3>
        <p>1. Select the service you want from the drop down</p> <br />
        <img className="img" src={step1} alt="step1"/>
        <div class="space"></div>
        <p>2. Select the date you want for the service</p><br />
        <img className="img" src={step2} alt="step2"/>
        <div class="space"></div>
        <p>3. Select the date you want for the service</p><br />
        <img className="img" src={step3} alt="step3"/>
        <div class="space"></div>
        <p>4. Enter your details and select "Book".</p><br />
        <img className="img" src={step4} alt="step4"/>
        <div class="space"></div>
        <p>5. You have successfully booked! </p>

      </div>
    </div>
  );
}

export default About;
