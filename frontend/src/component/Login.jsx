import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from '../image/image.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6700/api/auth/login', { email, pass: password });
      localStorage.setItem('token', response.data.token); // Save token
      localStorage.setItem('user_names', response.data.user_names);
      localStorage.setItem('user_rol', response.data.user_rol);
      localStorage.setItem('user_email', response.data.user_email);

      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 3000,
      });
      window.location.href = "/Dashboard";
    } catch (error) {
      toast.error('Login failed. Please check your credentials.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='grid md:grid-cols-2 grid-cols-1'>
      <div
        className="h-screen bg-cover bg-opacity-40 bg-center bg-gray-800"
      >
        <div className="h-screen  max-w-sm mx-auto grid items-center">
          <div className="p-6 shadow-gray-500 border-red-400 border rounded bg-slate-400 bg-opacity-40">
            <div className="text-center">
              <h1 className="p-6 text-5xl text-white font-bold">Login</h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@gmail.com"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                  placeholder="Password"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-1/2  px-5 py-2.5"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div
          className="h-screen bg-cover bg-gray-950 bg-center sm:block hidden"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="h-screen mx-auto grid items-center ">
            <div className="">
              <div className="text-center">
                <h1 className="p-6 text-5xl text-white font-bold uppercase">System pos</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
