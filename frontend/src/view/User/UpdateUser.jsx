import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import banner from '../../image/image.jpg';
import {API_URL} from '../../service/api'


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRePass] = useState('');
    const [rol, setRol] = useState('user');
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserByID();
        }
    }, [id]);


    // Fetch user details by ID
    const getUserByID = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/${id}`);
            const user = response.data;
            setEmail(user.user_email);
            setNames(user.user_names);
            setRol(user.user_rol);
            // console.log(user.user_email)
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError('Error fetching user data');
        }
    };



    // Handle Registration or Update
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (pass !== repass) {
            setError("សូមលោកអ្នកបញ្ចូលពាក្យសម្ងាត់ឲបានត្រឹមត្រូវ!");
            return;
        }

        if (pass.length > 0 && pass.length < 8) {
            setError("សូមលោកអ្នកបញ្ចូលពាក្យសម្ងាត់តូចបំផុត 8 ខ្ទង់!");
            return;
        }

        try {
            const userData = { names, email, pass: pass || undefined, rol };

            await axios.put(`http://localhost:6700/api/auth/update/${id}`, userData);
            toast.success("User updated successfully!", { position: "top-center", autoClose: 3000 });

            navigate('/user');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setErrorEmail(" អ៊ីមែលត្រូវបានប្រើប្រាស់រួចហើយ!");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='px-6 dm:ml-64  bg-gray-200 dark:bg-gray-950'>
                <div className="w-full grid md:grid-cols-2 bg-white dark:border-gray-700 animate-fade-up animate-duration-2000 animate-ease-in-out ">
                    <div
                        className="h-screen bg-cover bg-opacity-40 bg-center bg-gray-800"
                    >
                        <div className="h-screen max-w-sm mx-auto grid items-center">
                            <div className="p-6 bg-slate-100 bg-opacity-40">
                                <div className="flex justify-center py-6">
                                    <h1 className="font-bold font-KhmerMoul text-2xl text-center">ហាងលក់ <br /> ទំនិញចែប៊ីម៉ាត</h1>
                                </div>
                                <form onSubmit={handleUpdate}>

                                    {/* Name Input */}
                                    <div className='mb-5 space-y-2'>
                                        <label className="font-NotoSansKhmer font-bold text-lg">ឈ្មោះប្រើប្រាស់:*</label>
                                        <input type="text" value={names} onChange={(e) => setNames(e.target.value)}
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5' required />
                                    </div>

                                    {/* Email Input */}
                                    <div className='mb-5 space-y-2'>
                                        <label className="font-NotoSansKhmer font-bold text-lg">អុីម៉ែល:*</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5' required />
                                        {errorEmail && <p className="text-red-500 text-sm">{email} {errorEmail}</p>}
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-5 space-y-2 relative">
                                        <label className="font-NotoSansKhmer font-bold text-lg">ពាក្យសម្ងាត់:</label>
                                        <input type={showPassword ? 'text' : 'password'} value={pass} onChange={(e) => setPass(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md block w-full p-2.5"
                                            placeholder="ពាក្យសម្ងាត់ថ្មី (អាចន្លោះចោលបាន)" />
                                        <div className="absolute text-2xl top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "🐵" : "🙈"}
                                        </div>
                                    </div>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}


                                    <div className="mb-5 space-y-2">
                                        <label className="font-NotoSansKhmer font-bold text-lg">បញ្ជាក់ពាក្យសម្ងាត់:</label>
                                        <input type="password" value={repass} onChange={(e) => setRePass(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md block w-full p-2.5"
                                            placeholder="បញ្ជាក់ពាក្យសម្ងាត់" />
                                    </div>



                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    {/* Role Selection */}
                                    <div className='mb-5 space-y-2'>
                                        <label className="font-NotoSansKhmer font-bold text-lg">អ្នកប្រើប្រាស់:*</label>
                                        <select value={rol} onChange={(e) => setRol(e.target.value)}
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5'>
                                            <option value="superadmin">SuperAdmin</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                            <option value="cashier">Cashier</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <div className='flex justify-center pb-10'>
                                        <button type="submit"
                                            className='text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm w-full sm:w-auto px-5 py-2.5'>
                                            {id ? "កែប្រែអ្នកប្រើប្រាស់" : "បង្កើតអ្នកប្រើប្រាស់"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Background Image */}
                    <div className="h-screen bg-cover bg-gray-950 bg-center hidden md:block" style={{ backgroundImage: `url(${banner})` }}></div>
                </div>
            </div>
        </div>
    );
};

export default Register;

