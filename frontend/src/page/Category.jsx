
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import iconAdd from '../image/add-60.png'
import { toast } from 'react-toastify';
import Pagination from './pagination/Pagination';
import icondelete from '../image/recycle-bin-50.png'
import iconedit from '../image/edit.png'


const Dashboard = () => {

  const [names, setNames] = useState('');
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');

  //// paginate and search data
  const [category, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [UserLogin_Name, setUserLogin_Name] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('names');
    setUserLogin_Name(storedUsername);
    getAllStudent();
  }, [page, limit, searchQuery]);

  //// get all category add paginate and search
  const getAllStudent = async () => {
    setLoading(true);  // Set loading state to true
    try {
      const response = await axios.get('http://localhost:6700/categories', {
        params: {
          page,
          limit,
          search_query: searchQuery
        }
      });
      setStudent(response.data.categories);
      setTotalPages(response.data.totalPages);
      setError(null);  // Reset error state if request is successful
    } catch (error) {
      setError('Error fetching categories data');  // Set error state if request fails
    } finally {
      setLoading(false);  // Set loading state to false
    }
  };
  /// page total
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  //// search data
  const handleSearch = (event) => {
    if (setPage(0)) {
      alert('not found!')
    } else {
      setSearchQuery(event.target.value);
      setPage(1); // Reset to the first page on search 
    }

  };

  /// show modal insert
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // modal insert
  const openInsertModal = () => {
    setIsInsertModalOpen(true);
  };
  // modal update 
  const openUpdateModal = cat => {
    setSelectedCategoryId(cat.id);
    setDetail(cat.detail);
    setNames(cat.cat_names);
    setIsUpdateModalOpen(true);
  };
  // modal update 
  const UpdateTeacher = async e => {
    e.preventDefault();
    setError('');
    const values = {
      cat_names: names,
      detail: detail,
    }
    try {
      await axios.put(`http://localhost:6700/categories/${selectedCategoryId}`, values);
      toast.success('Category updated successfully!', { autoClose: 3000 });
      getAllStudent();
      setIsUpdateModalOpen(false);
      setSelectedCategoryId(null);
      setNames('');
      setDetail('');
    } catch (err) {
      console.error(err);
      setNames('');
      setDetail('');
      toast.error('Error updating category!', { autoClose: 3000 });
    }
  };


  // modal delete
  const openDeleteModal = cat => {
    setSelectedCategoryId(cat.id);
    setIsDeleteModalOpen(true);
  };

  // modale delete
  const deleteCategory = async () => {
    if (selectedCategoryId) {
      try {
        await axios.delete(`http://localhost:6700/categories/${selectedCategoryId}`);
        toast.success('Category deleted successfully!', { autoClose: 3000 });
        getAllStudent();
        setIsDeleteModalOpen(false);
        setSelectedCategoryId(null);
      } catch (err) {
        console.error(err);
        toast.error('Error deleting category!', { autoClose: 3000 });
      }
    }
  };

  // greate category
  const CreateCategory = async (e) => {
    e.preventDefault();
    setError('');
    const values = {
      cat_names: names,
      detail: detail,
    }
    try {
      const res = await axios.post('http://localhost:6700/categories', values);
      console.log(res.data);
      toast.success('Create categories successfully!', { autoClose: 3000 });
      setNames('');
      setDetail('');
      getAllStudent();
      setIsInsertModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Error adding !', { autoClose: 3000 });
    }
  };

  return (
    <div>
      <Navbar />
      <div className='py-16 px-2 lg:ml-64 bg-white dark:bg-gray-950'>
        <div className='border-2 border-gray-200 rounded-lg dark:border-gray-700'>
          <div className='flex justify-between py-4 px-4 md:mr-14'>
            <div className='flex space-x-4'>
              <button onClick={openInsertModal} className='bg-blue-500 md:py-2 py-0 px-6 hover:bg-blue-600  rounded shadow-md dark:bg-gray-500 dark:text-white'>
                <img src={iconAdd} alt="" className='h-6 w-6' />
              </button>
              <input
                type='text'
                value={searchQuery}
                onChange={handleSearch}
                className='block md:py-2 py-1 px-4 text-sm text-gray-900 rounded-lg w-40 md:w-80 sm:w-60 bg-gray-200 dark:bg-gray-500 dark:text-white'
                placeholder='Search for names '
              />
            </div>
            <div className='flex items-center text-center space-x-2 md:mt-0 dark:bg-gray-950 dark:text-white'>
              <p>ចំនួនសរុប</p>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-2 py-2 dark:bg-gray-700 dark:text-white "
              >
                {[1, 5, 10, 20, 50, 100].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : category.length === 0 ? (
              <p className="text-start py-4 px-10 text-red-500">រកមិនឃើញប្រភេទ ? {searchQuery}</p>
            ) : (
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">ល.រ</th>
                    <th scope="col" class="px-6 py-3">ឈ្មោះ</th>
                    <th scope="col" class="px-6 py-3">ការណិពណ័នា</th>
                    <th scope="col" class="px-6 py-3">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((categorys, index) => (
                    <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td class="px-6 py-1 w-8">{index + 1}</td>
                      <th scope="row" class="px-6 py-4 w-44 font-medium text-gray-900 dark:text-gray-200 ">
                        {categorys.cat_names}
                      </th>
                      <td class="px-6 w-44 py-1">{categorys.detail}</td>
                      <td className="px-1 md:space-x-4 w-44 space-x-1 flex">
                        <button
                          onClick={() => openDeleteModal(categorys)}
                          className='block text-white bg-red-100 my-1  hover:bg-red-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                        >
                          <img src={icondelete} className='h-4 w-4' alt='delete' />
                        </button>
                        <button
                          onClick={() => openUpdateModal(categorys)}
                          className='block text-white bg-blue-100 my-1 hover:bg-blue-500 font-medium rounded-full text-sm px-2 py-2 text-center'
                        >
                          <img src={iconedit} className='h-4 w-4' alt='edit' />
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              limit={limit}
              setLimit={setLimit}
            />

          </div>

        </div>
      </div>

      {/* Insert Modal */}
      {isInsertModalOpen && (
        <div
          id={`insert-modal`}
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900  dark:text-white">ប្រភេទទំនិញ</h3>
              <button
                type="button"
                className="hover:text-gray-600 bg-transparent hover:bg-gray-200 text-red-500  rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsInsertModalOpen(false)}
              >
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4l8 8m0-8l-8 8"
                  />

                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 bottom-8 overflow-y-auto max-h-screen">
              <form class="" onSubmit={CreateCategory}>
                <div className="">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2 sm:col-span-2">
                      <label
                        for="price"
                        class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ឈ្មោះ</label>
                      <input
                        type="text"
                        value={names}
                        onChange={e => setNames(e.target.value)}
                        id="price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                        placeholder="ឈ្មោះនៃប្រភេទទំនិញ" required
                      />
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="description" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ការណិពណ័នា</label>
                      <textarea id="description"
                        rows="4"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm py-2 rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                        placeholder="ការណិពណ័នា">
                      </textarea>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <button
                      type="submit"

                      className="block py-2 px-6 my-4 rounded justify-end text-white bg-blue-700 hover:bg-blue-800 dark:bg-slate-300 "
                    >
                      រក្សាទុក្ខ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div
          id={`delete-modal`}
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete Category</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6m-6-6l6-6m-6 6L1 1"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Are you sure you want to delete this category? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={deleteCategory}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div
          id={`insert-modal`}
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900  dark:text-white">បន្ថៃមគ្រូបង្រៀន</h3>
              <button
                type="button"
                className="hover:text-gray-600 bg-transparent hover:bg-gray-200 text-red-500  rounded-lg text-sm w-12 h-12 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4l8 8m0-8l-8 8"
                  />

                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 bottom-8 overflow-y-auto max-h-screen">
              <form class="" onSubmit={UpdateTeacher}>
                <div className="">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2 sm:col-span-2">
                      <label
                        for="price"
                        class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">ឈ្មោះ</label>
                      <input
                        type="text"
                        value={names}
                        onChange={e => setNames(e.target.value)}
                        id="price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                        placeholder="" required
                      />
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <label for="description" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">មុខវិជ្ជាបង្រៀន</label>
                      <textarea id="description"
                        rows="4"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm py-2 rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:text-white  "
                        placeholder="មុខវិជ្ជាបង្រៀន">
                      </textarea>
                    </div>
                  </div>
                  <div className='flex items-end justify-end'>
                    <button
                      type="submit"
                      className="block py-2 px-6 rounded-lg text-white bg-blue-700 hover:bg-blue-800 dark:bg-slate-300"
                    >
                      រក្សាទុក្ខ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
