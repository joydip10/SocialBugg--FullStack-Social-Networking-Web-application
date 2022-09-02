import React, { useEffect, useState } from 'react';
import Defaultlayout from './../components/Defaultlayout/Defaultlayout';
import { useParams } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Spinner from '../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProfilePostComponent from './../components/Post/ProfilePostComponent';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);

    const { isLoading, getUser, getUsers, updateUser, getPosts, deletePost } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        getUser(id)
            .then((res) => {
                setUser(res?.data());
            })
    }, [])

    useEffect(() => {
        getPosts()
            .then(res => {
                const filteredPosts = res.filter(pst => pst.user.id === id);
                setPosts(filteredPosts);
            })
    }, [])

    const deletePostsFromAllShares = (id) => {
        getUsers().then(res => {
            const users = res;
            users.forEach(user => {
                const filteredShares = user?.shares.filter(share => share.id !== id);
                let tempShares = user?.shares ?? [];
                tempShares = filteredShares;
                updateUser(user?.id, { ...user, shares: tempShares })
                    .then(res => {
                        console.log('All shares have been adjusted!');
                    })
            })
        });
    }
    const deleteAPost = (id) => {
        deletePost(id)
            .then(res => {
                const filteredPosts = posts.filter(post => post.id !== id);
                setPosts(filteredPosts);
                deletePostsFromAllShares(id);
                toast.success('A post has been deleted');
                navigate(`/profile/${user?.id}`);
            })
            .catch(err => {
                toast.error('Something went wrong! Couldn\'t delete a post!');
            })
    }

    return (
        <Defaultlayout>
            <h1 className='text-primary text-3xl font-semibold my-2'>Profile</h1>
            {
                (isLoading === true) && <Spinner />
            }
            <div className='flex justify-start space-x-2 items-center shadow-lg p-3 mb-5'>
                <h1 className="bg-primary text-white p-4 rounded-full text-3xl w-32 h-32 flex justify-center items-center">{user?.displayName.split(' ')[0]}</h1>
                <div>
                    <h1>{user?.displayName}</h1>
                    <h1>{user?.email}</h1>
                    <h1>Hi I am {user?.displayName.split(' ')[0]}</h1>
                </div>
            </div>
            <h1 className='text-primary text-3xl font-semibold my-2'>Posts shared by Me</h1>
            {
                (posts.length < 1 && isLoading===false) && <h1>{user?.displayName.split(' ')[0]} you haven't posted anything yet!</h1>
            }
            <div className='grid grid-cols-4 sm:grid-cols-1 sm:grid-col-1'>
                {
                    posts?.map(post => <ProfilePostComponent key={post.id} post={post}> <button className='p-2 bg-primary text-white hover:bg-slate-600 hover:font-semibold' onClick={() => {
                        deleteAPost(post.id); 
                        navigate(`/profile/${user?.id}`);}}> Delete post </button> </ProfilePostComponent>)
                }
            </div>
        </Defaultlayout>
    );
};

export default Profile;