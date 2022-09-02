import React, { useEffect, useState } from 'react';
import Defaultlayout from './../components/Defaultlayout/Defaultlayout';
import useAuth from './../hooks/useAuth';
import Spinner from './../components/Spinner/Spinner';
import PostComponent from './../components/Post/PostComponent';

const Home = () => {
    const [posts,setPosts]=useState([]);
    const {isLoading,getPosts} = useAuth();

    useEffect(()=>{
        getPosts()
        .then((res)=>{
            setPosts(res);
        });
    },[])

    return (
        <Defaultlayout>
            {(isLoading===true)
            ? <Spinner/>
            : 
            <div className='grid grid-cols-4 sm:grid-cols-1 sm:grid-col-1'>
                {
                    posts.map(post=><PostComponent key={post.imageURL} post={post}></PostComponent>)
                }
            </div>}
        </Defaultlayout>
    );
};

export default Home;