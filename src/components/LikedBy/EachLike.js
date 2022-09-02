import React from 'react';

const EachLike = ({like}) => {
    const {displayName,email}=like;
    return (
        <div className='flex justify-start items-center'>
            <p className=' p-2 text-2xl border rounded-full bg-primary text-white flex justify-center items-center'>{displayName.split(' ')[0]}</p>
            <p className='font-semibold text-gray-700'>{email}</p>
        </div>
    );
};

export default EachLike;