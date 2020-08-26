import React, { Component } from "react";

export class AddShift extends Component {
  render() {
    return (
      <div>
        <div class="flex flex-wrap -mx-3 mb-6 ">
          <div class="max-w-md md:w-1/2 px-3 my-6 md:mb-0 mx-auto">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Search Employee
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Search Employee's name"
            />
          </div>
        </div>
        <div className="flex justify-evenly mx-5 my-5 py-5">
          <div className="max-w-xl container border-2 border-blue-500">
            <div className="flex justify-evenly bg-blue-500">
              <svg
                class="fill-current text-white inline-block pr-4 w-12"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <div className="date">
                <p class="text-5xl text-white">August</p>
                <p class="text-white mb-5">Tue, August 25,2020</p>
              </div>
              <svg
                class="fill-current text-white inline-block pl-4 w-12"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
            <div className="flex justify-evenly my-3 text-center ">
              <div className="flex-column justify-evenly w-10">
                <div>Sun</div>
                <div className="text-black text-opacity-25">26</div>
                <div className="hover:bg-blue-500 ">3</div>
                <div className="hover:bg-blue-500 ">10</div>
                <div className="hover:bg-blue-500">17</div>
                <div className="hover:bg-blue-500">24</div>
                <div className="text-black text-opacity-25">31</div>
              </div>
              <div className="flex-column justify-evenly">
                <div>Mon</div>
                <div className="text-black text-opacity-25">27</div>
                <div className="hover:bg-blue-500">4</div>
                <div className="hover:bg-blue-500">11</div>
                <div className="hover:bg-blue-500">18</div>
                <div className="hover:bg-blue-500 active:bg-blue-700">25</div>
                <div className="text-black text-opacity-25"> 1</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
                <div>Tue</div>
                <div className="text-black text-opacity-25">28</div>
                <div className="hover:bg-blue-500">5</div>
                <div className="hover:bg-blue-500">12</div>
                <div className="hover:bg-blue-500">19</div>
                <div className="hover:bg-blue-500 bg-blue-500 ">26</div>
                <div className="text-black text-opacity-25">2</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
                <div>Wed</div>
                <div className="text-black text-opacity-25">29</div>
                <div className="hover:bg-blue-500">6</div>
                <div className="hover:bg-blue-500">13</div>
                <div className="hover:bg-blue-500">20</div>
                <div className="hover:bg-blue-500">27</div>
                <div className="text-black text-opacity-25">3</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
                <div>Thu</div>
                <div className="text-black text-opacity-25">30</div>
                <div className="hover:bg-blue-500">7</div>
                <div className="hover:bg-blue-500">14</div>
                <div className="hover:bg-blue-500">21</div>
                <div className="hover:bg-blue-500">28</div>
                <div className="text-black text-opacity-25">4</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
                <div>Fri</div>
                <div className="hover:bg-blue-500">1</div>
                <div className="hover:bg-blue-500">8</div>
                <div className="hover:bg-blue-500">15</div>
                <div className="hover:bg-blue-500">22</div>
                <div className="hover:bg-blue-500">29</div>
                <div className="text-black text-opacity-25">5</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
                <div>Sat</div>
                <div className="hover:bg-blue-500">2</div>
                <div className="hover:bg-blue-500">9</div>
                <div className="hover:bg-blue-500">16</div>
                <div className="hover:bg-blue-500">23</div>
                <div className="hover:bg-blue-500">30</div>
                <div className="text-black text-opacity-25">6</div>
              </div>
            </div>
          </div>

          <div className=" self-center mx-5 px-5">
            <div className="flex space-x-6">
            <div className="flex flex-col w-32 space-y-3">
            <button class=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              6:30
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              10:30
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              14:30
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              18:30
            </button>
            </div>
            <div className="flex flex-col space-y-3 w-32">
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              8:30
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              12:30
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              16:30
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              20:30
            </button>
            </div>
          </div>
        </div>
        </div>
        <div class="flex mt-5 pt-5 justify-center space-x-5">
          <div>
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
              type="submit"
            >
              Add Shift
            </button>
          </div>
          <div className="pl-5">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={() => {
                this.props.history.push("/profile");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddShift;
