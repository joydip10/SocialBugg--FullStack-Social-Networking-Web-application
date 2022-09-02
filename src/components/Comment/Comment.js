import React from 'react';
import useAuth from './../../hooks/useAuth';

const Comment = ({ originalComment, currentuser,removeComment}) => {
    const { displayName, comment, date, time, email } = originalComment;
    
    return (
        <div className='flex flex-col space-y-1 shadow-lg p-4 mb-2'>
            <div className='flex justify-start items-center font-semibold space-x-2'>
                <h1>{displayName}</h1>
                <div className='flex items-center space-x-2'>
                    <h1>{date || "20-2-12"}</h1>
                    <h1>{time || "2:23 AM"}</h1>
                </div>
            </div>
            <div className='space-y-2'>
                <h1 className=''>{comment}</h1>
                {
                    (email === currentuser.email) && <button className='bg-primary text-white text-sm p-1 rounded-md' onClick={removeComment}>Remove</button>
                }
            </div>
        </div>
    );
};

export default Comment;