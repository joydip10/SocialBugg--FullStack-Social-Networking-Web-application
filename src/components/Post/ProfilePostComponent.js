import React from 'react';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
const ProfilePostComponent = ({ post, children }) => {
    const { comments, imageURL, likes, user,id } = post;
    const { displayName } = user;
    const navigate=useNavigate();


    return (
        <div className='flex flex-col p-4 shadow-lg cursor-pointer'>
            <div className='flex justify-center items-center space-x-2 mb-2'>
                <p className='h-10 w-10 rounded-full bg-primary text-white font-semibold flex justify-center items-center'>{displayName.split(' ')[0]}</p>
                <p>{displayName}</p>
            </div>
            <div className='w-full text-center flex justify-center'>
                <img src={imageURL} alt="" className="h-60 w-60" />
            </div>
            <div className='flex items-center p-2 space-x-3'>
                <div className='flex items-center justify-center space-x-1'>
                    <AiFillHeart color="red" size={25} />
                    <h1>{likes.length}</h1>
                </div>
                <div className='flex items-center justify-center space-x-1'>
                    <AiOutlineComment size={25} />
                    <h1>{comments.length}</h1>
                </div>
            </div>
            <button className='p-2 bg-primary text-white mb-2 hover:bg-slate-600 hover:font-semibold'  onClick={()=>navigate(`/post/${id}`)}>Visit the post</button>
            {children}
        </div>
    );
};

export default ProfilePostComponent;