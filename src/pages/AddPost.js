import React, { useState } from 'react';
import Defaultlayout from './../components/Defaultlayout/Defaultlayout';
import useAuth from './../hooks/useAuth';
import Spinner from './../components/Spinner/Spinner';

const AddPost = () => {
    const [image, setImage] = useState('');
    const [description, setDescription] = useState("");
    const { isLoading, addPost } = useAuth();

    return (
        <Defaultlayout>
            <h1 className='text-3xl font-semibold text-gray-500'>Add New Post</h1>
            {
                (isLoading === true) ? <Spinner />
                    :
                    <div className='w-screen flex flex-col'>
                        <textArea className="border-dashed border-gray-500 border-2 w-1/2 sm:w-full md:w-3/4 my-5 p-2" rows="5" onChange={(e) => setDescription(e.target.value)} />
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        {
                            (image) &&
                            <img src={URL.createObjectURL(image)} alt="something" className='my-3 h-52 w-52 rounded-sm' />
                        }
                        {
                            (image && description) &&
                            <div className=''>
                                <button className='border text-xl px-5 py-2 rounded-sm bg-primary text-white' onClick={() => {
                                    addPost(image,description);
                                    setImage("");
                                }}>Upload</button>
                            </div>
                        }
                    </div>
            }
        </Defaultlayout>
    );
};

export default AddPost;