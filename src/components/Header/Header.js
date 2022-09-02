import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgMenuRightAlt } from "react-icons/cg";
import useAuth from './../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const { user, logOut } = useAuth();
    const currentuser=JSON.parse(localStorage.getItem('social-bugg-user'));

    const navigate=useNavigate();

    const menuItems = [
        { title: 'Home', path: '/home' },
        { title: 'Add Post', path: '/addpost' },
        { title: 'Shares', path: '/shares' },
        { title: 'Profile', path: `/profile/${currentuser?.id}` },
    ]
    
    return (
        <div className='p-10 bg-primary rounded-md'>
            {
                (!showMenu) && (
                    <div className='md:flex justify-end hidden'>
                        <CgMenuRightAlt size={30} color='white' className='cursor-pointer -mb-28' onClick={() => setShowMenu(true)} />
                    </div>
                )
            }

            <div className='flex justify-between items-center '>
                <h1 className='text-2xl text-gray-200 font-semibold cursor-pointer' onClick={()=>navigate('/home')}>Social Bugg</h1>

                {/* Web View */}
                <div className='flex justify-end items-center space-x-10 md:hidden'>
                    {
                        menuItems.map(item => <Link className={`text-gray-200 text-xl ${(location.pathname === item.path) && '!text-black bg-white px-5 py-2 rounded-sm'}  hover:text-white`} key={item.path} to={item.path}>{item.title}</Link>)
                    }
                    {
                        (user?.email) && <h1 className='text-gray-200 text-xl hover:text-white cursor-pointer' onClick={() => logOut()}>Logout</h1>
                    }
                </div>

                {/* Mobile View */}
                {
                    (showMenu) && (
                        <div className='md:flex justify-end flex-col items-end space-y-5 hidden'>
                            {
                                menuItems.map(item => <Link className={`text-gray-200 text-xl ${(location.pathname === item.path) && '!text-black bg-white px-5 py-2 rounded-sm'}  hover:text-white`} key={item.path} to={item.path} >{item.title}</Link>)
                            }
                            {
                                (user?.email) && <h1 className='text-gray-200 text-xl hover:text-white cursor-pointer' onClick={() => logOut()}>Logout</h1>
                            }

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Header;