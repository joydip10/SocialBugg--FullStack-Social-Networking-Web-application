import React, { useEffect, useState } from 'react';
import SharedPost from '../components/SharedPost/SharedPost';
import Spinner from '../components/Spinner/Spinner';
import Defaultlayout from './../components/Defaultlayout/Defaultlayout';
import useAuth from './../hooks/useAuth';

const Shares = () => {
    const [shares,setShares]=useState([]);
    const currentuser=JSON.parse(localStorage.getItem('social-bugg-user'));
    const {isLoading,getUser}=useAuth();

    useEffect(()=>{
        getUser(currentuser.id)
        .then(res=>{
            setShares(res?.data().shares);
        })
    },[])

    return (
        <Defaultlayout>
            <h1 className='text-3xl text-white bg-primary p-3 mt-3'>Shared with me</h1>
            {
                (isLoading) && <Spinner/>
            }
            {
                (!shares) && <h1> No shared post found! </h1>
            }
            <div className='grid gap-1 grid-cols-4 sm:grid-cols-1 sm:grid-col-1'>
            {
                shares?.map(shared=><SharedPost key={shared.id} shares={shared}/>)
            }
            </div>
        </Defaultlayout>
    );
};

export default Shares;