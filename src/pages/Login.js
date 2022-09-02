import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner/Spinner';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, logregerror, setError, isLoading, signIn, logOut } = useAuth();

    useEffect(()=>{
        setError("");
    },[])

    const logInClicked = async (e) => {
        e.preventDefault();
        await signIn(email, password);
    }
    return (
        <>
            {
                (isLoading === true || user?.email) ?
                    <Spinner/>
                    :
                    <>
                        {
                            (!user?.email) &&
                                <form className='h-screen' onSubmit={logInClicked}>
                                    <div className="flex justify-start">
                                        <div className='h-32 bg-primary w-96 text-white text-center text-4xl flex justify-center items-center -skew-x-12 -ml-4'>Social</div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='w-96 flex flex-col space-y-10 border p-4 shadow-lg'>
                                            <div>
                                                <h1 className='text-4xl text-primary font-semibold'>Log in</h1>
                                                <hr className='border-gray-900 border-spacing-1' />
                                            </div>

                                            {/* email */}
                                            <input type="email" className='border px-4 border-primary h-10 rounded-sm placeholder:text-gray-800 ' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />

                                            {/* password */}
                                            <input type="password" className='border px-4 border-primary h-10 rounded-sm placeholder:text-gray-800 ' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />

                                            <button type='submit' className='border p-4 border-l-pink-50 bg-primary text-white' >Log in</button>
                                            
                                            <Link to='/register' className='link-text text-center'>NOT YET REGISTERED? CLICK HERE TO REGISTER</Link>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="flex justify-end">
                                        <div className='h-32 bg-primary w-96 text-white text-center text-4xl flex justify-center items-center -skew-x-12 -mr-4'>Bugg</div>
                                    </div>
                                </form>
                        }
                    </>
            }

        </>
    );
};

export default Login;