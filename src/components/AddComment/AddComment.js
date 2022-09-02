import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../Spinner/Spinner';
import useAuth from './../../hooks/useAuth';

const AddComment = ({user,post,setShowAddComment,postId,setPost}) => {
    const {displayName}=user;
    const [comment,setComment]=useState('');

    const {isLoading,updatePost}=useAuth();
    var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

    const addComment=()=>{
        let updatedComments;
        const currentUser = JSON.parse(localStorage.getItem('social-bugg-user'));
        post.comments.push({
            id:ID(),
            userid: currentUser?.id,
            email: currentUser?.email,
            displayName: currentUser?.displayName,
            comment:comment,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        })
        updatedComments = post.comments;
        const updated = { ...post, comments: updatedComments };
        updatePost(postId, updated)
                .then(res => {
                    toast.success('A comment has been added!');
                    const updatedPost = res?.data();
                    setPost((updatedPost) => updatedPost);
                    setComment("");
                    setShowAddComment(false);
                    document.getElementById('textArea').value="";
                });
    }

    return (
        <>
        {
            (isLoading===true) && <Spinner/>
        }
        <div className='space-y-2 flex flex-col justify-center shadow-lg p-4 shadow-neutral-700 w-96 md:w-full'  data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="1500">

            <div className='flex justify-between items-center bg-gray-400 p-4 rounded-md'>
                <h1 className='text-3xl text-primary font-semibold'>Add a Comment</h1>
                <h1 className='border-2 font-semibold ring-red-800 tex-black rounded-full p-2 hover:bg-primary hover:text-white cursor-pointer' onClick={()=>{setShowAddComment(false)}}>X</h1>
            </div>

            <div className=''>
                <h1 className='text-lg text-gray-700 font-semibold'>By {displayName} on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</h1>
            </div>
            <div className='flex flex-col space-y-2'>
                <textArea id="textArea" className="border-2 border-dashed border-gray-700 p-2" rows="5" onChange={(e)=>setComment(e.target.value)}></textArea>
                <div className='flex justify-end item-end'>
                <button className='bg-primary text-white px-3 py-2 rounded-md' onClick={addComment}>Add</button>
                </div>
            </div>

        </div>
        </>
    );
};

export default AddComment;