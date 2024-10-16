import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rol, setRol] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6700/api/auth/register', { names, email, pass, rol });
      console.log('Registration successful:', response.data);
      toast.success('Register successful!', {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      toast.error('Register failed.Email already in use.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (

    <div className='h-screen'>
      <div className='h-screen max-w-sm mx-auto grid items-center'>
        <div className='bg-slate-50 shadow-xl p-6 shadow-gray-500 rounded-lg'>
          <div className='text-center'>
            <h1 className='p-6 text-5xl font-bold'>Register</h1>
            <div className='flex justify-center mb-6'>
              {/* <img className='h-32 w-34' src={logo} alt="Logo" /> */}
            </div>
          </div>
          <form onSubmit={handleRegister}>
            <div className='mb-5'>
              <label className='block mb-2 text-sm font-bold text-gray-900'>Your Name</label>
              <input
                type="text"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder="Name"
                required
              />
            </div>
            <div className='mb-5'>
              <label className='block mb-2 w-full text-sm font-bold text-gray-900'>Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                required
                placeholder="Email"
              />
            </div>
            <div className='mb-5'>
              <label className='block mb-2 w-full text-sm font-bold text-gray-900'>Your Password</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                required
                placeholder="Password"
              />
            </div>
            <div className='mb-5'>
              <label className='block mb-2 w-full text-sm font-bold text-gray-900'>User Type</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              >
                <option value="superadmin">SuperAdmin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className='flex justify-center py-7'>
              <button
                type="submit"
                className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Register;
