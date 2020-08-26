import React, { Component } from 'react'

export class Calendar extends Component {
    state ={
        "months":[
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
          "December"
        ],
        "currentMonth": "",
        "currentDate": ""
      }
      componentDidMount(){
        const date = new Date();
        this.setState({
          currentMonth: this.state.months[date.getMonth()],
          currentDate: date.toDateString()
        }
        )  
      }
    render() {
        return (

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
            
        )
    }
}

export default Calendar
