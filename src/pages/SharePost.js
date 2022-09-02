import React, { useEffect, useState } from 'react';
import Defaultlayout from './../components/Defaultlayout/Defaultlayout';
import useAuth from './../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import ShareUser from './../components/ShareUser/ShareUser';
import Spinner from '../components/Spinner/Spinner';
import { toast } from 'react-toastify';

const SharePost = () => {
    const {postId}=useParams();
    const [post,setPost]=useState({});
    const [users,setUsers]=useState([]);
    const [selectedUsers, setSelectedUsers]=useState([]);

    const { isLoading, getPost, getUsers, updateUser} = useAuth();
    const navigate=useNavigate();

    useEffect(()=>{
        getPost(postId)
            .then(res => {
                setPost(res.data());
            });
    },[])

    useEffect(()=>{
        getUsers()
        .then(res=>setUsers(res));
    },[]);

    const addOrRemoveUser=(user)=>{
        let temp=[...selectedUsers];

        if(temp.find(obj=>obj.id===user.id)){
            temp=temp.filter(obj=>obj.id!==user.id);
        }
        else{
            temp.push(user);
        }
        setSelectedUsers(temp);
    }

    const alreadySelected=(user)=>{
        if(selectedUsers.find(obj=>obj.id===user.id)){
            return true;
        }
    }

    const sharePost=()=>{
        if(selectedUsers.length<1){
            toast.warning('Select Users to share this post with!');
        }
        selectedUsers.forEach((user)=>{
            let tempShares=user.shares ?? [];
            const currentuser= JSON.parse(localStorage.getItem('social-bugg-user'));
            tempShares.push({...post, id:postId, sharedBy: currentuser});
            console.log(tempShares);
            updateUser(user?.id,{...user, shares:tempShares})
            .then((res)=>{
                toast.success('Post shared to the selected users!');
                setSelectedUsers([]);
                navigate('/home');
                tempShares=[];
            })
            .catch((err)=>{
                console.log(err);
                toast.error('Something went wrong!');
            })
        })
    }
    return (
        <Defaultlayout>
            {
                (isLoading===true) && <Spinner/>
            }
            <h1>Share this post</h1>
            <div id="post-section">
            <img src={post?.imageURL} className="h-32 w-32 border-2 rounded-md" alt=""/>
            </div>

            <h1 className='text-3xl text-primary my-5'>Select Users</h1>
            <div id="users-section" className='grid grid-cols-5 gap-1 sm:grid-cols-1 sm:grid-col-1'>
                {
                    users.map(user=><ShareUser key={user.id} user={user} addOrRemoveUser={()=>addOrRemoveUser(user)} alreadySelected={()=>alreadySelected(user)}/>)
                }
            </div>

            <button className='bg-primary text-white p-2 px-3 mt-2' onClick={sharePost}>Share post</button>
        </Defaultlayout>
    );
};

export default SharePost;