import React from 'react';
import EachLike from './EachLike';

const LikedBy = ({likes, setShowLikes}) => {
    return (
        <div className='flex flex-col justify-center space-y-5 shadow-lg p-4 shadow-neutral-700 w-96 md:w-full'  data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="1500">
            <div className='flex justify-between items-center'>
            <h1 className='text-3xl text-gray-800 shadow-md'> Liked By</h1>
            <h1 className='font-semibold border-2 rounded-full p-2 ring-red-400 hover:bg-black hover:text-white cursor-pointer' onClick={()=>setShowLikes(false)}>X</h1>
            </div>
            <div>
            {
                (likes.length) ?
                likes.map(like=><EachLike key={like.email} like={like} />)
                :
                <h1 className='text-xl'>Nobody Liked this post yet</h1>
            }
            </div>
        </div>
    );
};

export default LikedBy;