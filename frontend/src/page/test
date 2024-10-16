import React from 'react';
import Navbar from '../component/Navbar';


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-16 lg:ml-64 bg-white dark:bg-gray-950 h-screen'>
        <div className=' border-gray-200 rounded-lg dark:border-gray-700'>
          <div class="bg-gradient-to-r from-blue-500 to-blue-950 dark:from-gray-800 dark:to-gray-500 p-6">
            <div class="text-white text-2xl mb-4">
              <span class="font-semibold">សូមស្វាគមន៍</span>
            </div>

            <div class="grid md:grid-cols-4 grid-cols-2 gap-4 ">

              <div class="bg-white hover:scale-105 duration-1000 p-4 rounded shadow">
                <div class="flex items-center space-x-2">
                  <div class="bg-blue-400 p-3 rounded-full text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 6h15a1 1 0 001-1v-1H7zm-4 0H1"></path></svg>
                  </div>
                  <div class="text-lg font-semibold">ការទិញសំភារៈ</div>
                </div>
                <div class="mt-2 text-xl font-bold">0.00 $</div>
              </div>

              <div class="bg-white p-4 hover:scale-105 duration-1000 rounded shadow">
                <div class="flex items-center space-x-2">
                  <div class="bg-green-400 p-3 rounded-full text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-7 7-7-7"></path></svg>
                  </div>
                  <div class="text-lg font-semibold">NET</div>
                </div>
                <div class="mt-2 text-xl font-bold">0.00 $</div>
              </div>

              <div class="bg-white p-4 hover:scale-105 duration-1000 rounded shadow">
                <div class="flex items-center space-x-2">
                  <div class="bg-orange-400 p-3 rounded-full text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div class="text-lg font-semibold">វិក្កយបត្រ</div>
                </div>
                <div class="mt-2 text-xl font-bold">0.00 $</div>
              </div>

              <div class="bg-white p-4 hover:scale-105 duration-1000 rounded shadow">
                <div class="flex items-center space-x-2">
                  <div class="bg-red-400 p-3 rounded-full text-white">

                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7"></path></svg>
                  </div>
                  <div class="text-lg font-semibold">សំណាញ់អោយឥណទាន</div>
                </div>
                <div class="mt-2 text-xl font-bold">0.00 $</div>
              </div>

            </div>

            <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
              <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                <dl>
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
                  <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">$5,405</dd>
                </dl>
                <div>
                  <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                    <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                    Profit rate 23.5%
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 py-3">
                <dl>
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Income</dt>
                  <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">$23,635</dd>
                </dl>
                <dl>
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expense</dt>
                  <dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">-$18,230</dd>
                </dl>
              </div>

              <div id="bar-chart"></div>
              <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div class="flex justify-between items-center pt-5">

                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="lastDaysdropdown"
                    data-dropdown-placement="bottom"
                    class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                    type="button">
                    Last 6 months
                    <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 6 months</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last year</a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                    Revenue Report
                    <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
