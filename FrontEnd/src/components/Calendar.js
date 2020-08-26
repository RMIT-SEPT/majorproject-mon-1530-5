import React, { Component } from "react";

export class Calendar extends Component {
  state = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    currentMonth: "",
    currentDate: "",
    lastDay: "",
    "firstDayIndex:": "",
    prevLastDay: "",
  };
  componentDidMount() {
    const date = new Date();
    this.setState({
      currentMonth: this.state.months[date.getMonth()],
      currentDate: date.toDateString(),
      lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      firstDayIndex: date.getDay(),
      prevLastDay: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
    });
  }
  
  render() {
    return (
      <div className="max-w-lg container">
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
            <p class="text-5xl text-white">{this.state.currentMonth}</p>
            <p class="text-white mb-5">{this.state.currentDate}</p>
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
        <table class="table-auto border-2 border-blue-500 ">
          <thead>
            <tr>
              <th class="px-6 py-2">Sun</th>
              <th class="px-5 py-2">Mon</th>
              <th class="px-5 py-2">Tue</th>
              <th class="px-5 py-2">Wed</th>
              <th class="px-5 py-2">Thu</th>
              <th class="px-6 py-2">Fri</th>
              <th class="px-6 py-2">Sat</th>          
            </tr>
          </thead>
          <tbody>
    <tr>
      <td class="border px-4 py-2 bg-gray-500">26</td>
      <td class="border px-4 py-2 bg-gray-500">27</td>
      <td class="border px-4 py-2 bg-gray-500">28</td>
      <td class="border px-4 py-2 bg-gray-500">29</td>
      <td class="border px-4 py-2 bg-gray-500">30</td>
      <td class="border px-4 py-2 bg-gray-500">31</td>
      <td class="border px-4 py-2 hover:bg-blue-500">1</td>
    </tr>
    <tr>
      <td class="border px-4 py-2 hover:bg-blue-500">2</td>
      <td class="border px-4 py-2 hover:bg-blue-500">3</td>
      <td class="border px-4 py-2 hover:bg-blue-500">4</td>
      <td class="border px-4 py-2 hover:bg-blue-500">5</td>
      <td class="border px-4 py-2 hover:bg-blue-500">6</td>
      <td class="border px-4 py-2 hover:bg-blue-500">7</td>
      <td class="border px-4 py-2 hover:bg-blue-500">8</td>
    </tr>
    <tr>
      <td class="border px-4 py-2 hover:bg-blue-500">9</td>
      <td class="border px-4 py-2 hover:bg-blue-500">10</td>
      <td class="border px-4 py-2 hover:bg-blue-500">11</td>
      <td class="border px-4 py-2 hover:bg-blue-500">12</td>
      <td class="border px-4 py-2 hover:bg-blue-500">13</td>
      <td class="border px-4 py-2 hover:bg-blue-500">14</td>
      <td class="border px-4 py-2 hover:bg-blue-500">15</td>
    </tr>
    <tr>
      <td class="border px-4 py-2 hover:bg-blue-500">16</td>
      <td class="border px-4 py-2 hover:bg-blue-500">17</td>
      <td class="border px-4 py-2 hover:bg-blue-500">18</td>
      <td class="border px-4 py-2 hover:bg-blue-500">19</td>
      <td class="border px-4 py-2 hover:bg-blue-500">20</td>
      <td class="border px-4 py-2 hover:bg-blue-500">21</td>
      <td class="border px-4 py-2 hover:bg-blue-500">22</td>
    </tr>
    <tr>
      <td class="border px-4 py-2 hover:bg-blue-500">23</td>
      <td class="border px-4 py-2 hover:bg-blue-500">24</td>
      <td class="border px-4 py-2 hover:bg-blue-500">25</td>
      <td class="border px-4 py-2 hover:bg-blue-500">26</td>
      <td class="border px-4 py-2 hover:bg-blue-500">27</td>
      <td class="border px-4 py-2 hover:bg-blue-500">28</td>
      <td class="border px-4 py-2 hover:bg-blue-500">29</td>
    </tr>
    <tr>
      <td class="border px-4 py-2 hover:bg-blue-500">30</td>
      <td class="border px-4 py-2 hover:bg-blue-500">31</td>
      <td class="border px-4 py-2 bg-gray-500">1</td>
      <td class="border px-4 py-2 bg-gray-500">2</td>
      <td class="border px-4 py-2 bg-gray-500">3</td>
      <td class="border px-4 py-2 bg-gray-500">4</td>
      <td class="border px-4 py-2 bg-gray-500">5</td>
    </tr>
    </tbody>
        </table>
        {/* <div className="flex-column justify-evenly flex-wrap text-center ">
                <div className="flex justify-evenly flex-auto">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
                </div>
                <div className="flex justify-evenly">
                <div className="text-black text-opacity-25">26</div>
                <div className="hover:bg-blue-500">27</div>
                <div className="hover:bg-blue-500 ">28</div>
                <div className="hover:bg-blue-500">29</div>
                <div className="hover:bg-blue-500">30</div>
                <div className="hover:bg-blue-500">{this.state.lastDay}</div>
              </div> */}

        {/* <div className="flex-column justify-evenly">
                <div className="text-black text-opacity-25">27</div>
                <div className="hover:bg-blue-500">4</div>
                <div className="hover:bg-blue-500">11</div>
                <div className="hover:bg-blue-500">18</div>
                <div className="hover:bg-blue-500 active:bg-blue-700">25</div>
                <div className="text-black text-opacity-25">1</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
                <div className="text-black text-opacity-25">28</div>
                <div className="hover:bg-blue-500">5</div>
                <div className="hover:bg-blue-500">12</div>
                <div className="hover:bg-blue-500">19</div>
                <div className="hover:bg-blue-500 bg-blue-500 ">26</div>
                <div className="text-black text-opacity-25">2</div>
              </div>
              <div className="flex-column justify-evenly  w-10">
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
              </div> */}
      </div>
      // </div>
    );
  }
}

export default Calendar;
