import React from "react";

function Profile(props) {
  return (
    <div>
      <div className="container mx-auto pt-5">
        <h1 className="text-center text-4xl">My Dashboard</h1>
        <div className="flex justify-center py-5">
        <div className="text-gray-700 text-center  px-4 py-5 m-2">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                data-test="addEmployee"
                onClick= {()=>{
                  props.history.push('/addEmployee')
                }}
              >
                Add Employee
              </button>
         </div>
         <div class="text-gray-700 text-center  px-4 py-5 m-2">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                data-test="addShift"
                onClick= {()=>{
                  props.history.push('/addShift')
                }}
              >
                Add Shift
              </button>
              </div>
<hr/>
      </div>
      </div>
    </div>
  );
}

export default Profile;
