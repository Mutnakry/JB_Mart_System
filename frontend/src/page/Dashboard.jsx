import React from 'react';
import Navbar from '../component/Navbar';


const Dashboard = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='pt-16 lg:ml-64 bg-white dark:bg-gray-950 h-screen'>
        <div className=' border-gray-200 rounded-lg dark:border-gray-700'>
          <div class="bg-gradient-to-r from-blue-400 to-blue-300 dark:from-gray-800 dark:to-gray-500 p-6">
            <div class="text-white text-2xl mb-4">
              <span class="font-semibold">សូមស្វាគមន៍</span>
            </div>

            <div class="grid md:grid-cols-4 h-24 grid-cols-2 gap-4 ">

              <div class="bg-white hover:scale-105 duration-1000 p-4 shadow border-t-2 border-red-500">
                <div class="flex items-center space-x-2">
                  <div class="bg-blue-400 p-3 rounded-full text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 6h15a1 1 0 001-1v-1H7zm-4 0H1"></path></svg>
                  </div>
                  <div class="font-bold font-NotoSansKhmer text-gray-600">ការទិញសំភារៈ</div>
                </div>
                <div class="mt-2 text-xl font-bold text-gray-600">0.00 $</div>
              </div>
              <div class="bg-white p-4 hover:scale-105 duration-1000 shadow border-t-2 border-orange-500">
                <div class="flex items-center space-x-2">
                  <div class="bg-green-400 p-3 rounded-full text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-7 7-7-7"></path></svg>
                  </div>
                  <div class="font-bold font-NotoSansKhmer text-gray-600">NET</div>
                </div>
                <div class="mt-2 text-xl font-bold text-gray-600">0.00 $</div>
              </div>
              <div class="bg-white p-4 hover:scale-105 duration-1000 shadow border-t-2 border-yellow-500">
                <div class="flex items-center space-x-2">
                  <div class="bg-orange-400 p-3 rounded-full text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div class="font-bold font-NotoSansKhmer text-gray-600">វិក្កយបត្រ</div>
                </div>
                <div class="mt-2 text-xl font-bold text-gray-600">0.00 $</div>
              </div>
              <div class="bg-white p-4 hover:scale-105 duration-1000 shadow border-t-2 border-green-500">
                <div class="flex items-center space-x-2">
                  <div class="bg-red-400 p-3 rounded-full text-white">

                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7"></path></svg>
                  </div>
                  <div class="font-bold font-NotoSansKhmer text-gray-600">សំណាញ់អោយឥណទាន</div>
                </div>
                <div class="mt-2 text-xl font-bold text-gray-600">0.00 $</div>
              </div>

              
              <div className="flex items-center shadow h-24 hover:scale-105 duration-1000  bg-white border-t-2 border-blue-500">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-blue-500/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-blue-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>300</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>លក់សរុប</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center shadow h-24 hover:scale-105 duration-1000  bg-white border-t-2 border-green-500">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-green-500/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-green-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>

                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>4400</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ទិញសរុប</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center shadow h-24  hover:scale-105 duration-1000 bg-white border-t-2 border-red-500">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-red-500/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-red-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>


                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>3030</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>លក់ជំពាក់</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center shadow h-24 hover:scale-105 duration-1000  bg-white border-t-2 border-yellow-500">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-yellow-500/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-yellow-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
                    </svg>


                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-700'>300</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-700'>ទិញជំពាក់</h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center shadow h-24 hover:scale-105 duration-1000  bg-white border-t-2 border-red-500">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-red-500/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-red-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>300</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ចំណាយសរុប</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center shadow h-24 hover:scale-105 duration-1000  bg-white border-t-2 border-blue-600">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-blue-600/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>

                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>4400</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>អតិថិជនសរុប</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center shadow h-24  hover:scale-105 duration-1000 bg-white border-t-2 border-red-600">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-red-600/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ban text-red-600"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>
                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>3030</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ផលិតផលអស់ស្តុក</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center shadow  h-24  hover:scale-105 duration-1000 bg-white border-t-2 border-orange-500">
                <div className='flex items-center gap-4 mx-5'>
                  <div className='bg-orange-500/20 p-3 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right-left text-orange-500"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>
                  </div>
                  <div>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>300</h3>
                    <h3 className='font-bold font-NotoSansKhmer text-gray-600'>ទំនិញប្តូរសរុប</h3>
                  </div>
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
