import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner/Spinner";
import useAuth from './../hooks/useAuth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [regError, setRegError] = useState('');

    const { user, error, isLoading, signUp, logOut } = useAuth();
    // useEffect(()=>{
    //     console.log(user.uid);
    // },[user])

    const registeredClicked = async (e) => {
        e.preventDefault();
        if (password.length > 6 && confirmpassword.length > 6 && password === confirmpassword) {
            await signUp(name, email, password);
            setRegError('');
            console.log(email, name, password, confirmpassword);
        }
        else {
            setRegError('Password should consist of at least 6 characters and match');
        }
    }

    return (
        <>
            {(isLoading === true && !user?.displayName) ?
                <Spinner />
                :
                <>
                    {
                        (!user?.email) &&
                            <form className='h-screen bg-primary' onSubmit={registeredClicked}>
                                <div className="flex justify-start">
                                    <div className='h-32 bg-white w-96 text-primary text-center text-4xl flex justify-center items-center -skew-x-12 -ml-4'>Social</div>
                                </div>
                                <br />
                                <br />
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='w-96 flex flex-col space-y-10 border p-4 shadow-lg'>
                                        <div>
                                            <h1 className='text-4xl text-white font-semibold'>Create an Account</h1>
                                            <hr className='border-white border-spacing-1' />
                                        </div>
                                        {/* Name */}
                                        <input type="text" className='border px-4 border-primary h-10 rounded-sm placeholder:text-gray-800' placeholder='Name' onChange={(e) => setName(e.target.value)} required />

                                        {/* Email */}
                                        <input type="email" className='border px-4 border-primary h-10 rounded-sm placeholder:text-gray-800' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />

                                        {/* Password */}
                                        <input type="password" className='border px-4 border-primary h-10 rounded-sm placeholder:text-gray-800 ' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />

                                        {/* Confirm Password */}
                                        <input type="password" className='border px-4 border-primary h-10 rounded-sm placeholder:text-gray-800 ' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required />

                                        <button className='border p-4 border-l-pink-50 bg-slate-300 text-black'>Register</button>
                                        {(error) && <h1 className="link-text text-red-600 text-center">{error}</h1>}
                                        {(regError) && <h1 className="link-text text-red-600 text-center">{regError}</h1>}
                                        <Link to='/login' className='link-text text-center text-white'>REGISTERED? CLICK HERE TO LOG IN</Link>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="flex justify-end bg-primary">
                                    <div className='h-32 bg-white w-96 text-primary text-center text-4xl flex justify-center items-center -skew-x-12 -mr-4'>Bugg</div>
                                </div>
                            </form>
                    }
                </>
            }
        </>
    );
};

export default Register;