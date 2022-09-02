import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import useAuth from './../hooks/useAuth';
import Defaultlayout from './../components/Defaultlayout/Defaultlayout';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { ImShare } from 'react-icons/im';
import { toast } from 'react-toastify';
import LikedBy from '../components/LikedBy/LikedBy';
import AddComment from '../components/AddComment/AddComment';
import Comment from './../components/Comment/Comment';

const Post = () => {
    const { postId } = useParams();
    const { isLoading, getPost, updatePost } = useAuth();
    const [post, setPost] = useState({});
    const [showLikes, setShowLikes] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const navigate=useNavigate();


    useEffect(() => {
        getPost(postId)
            .then(res => {
                setPost(res.data());
            });
    }, []);

    let {  comments,description, imageURL, likes, user } = post;

    const isLiked = () => {
        const currentUser = JSON.parse(localStorage.getItem('social-bugg-user'));
        const anyUser = likes.find(like => like.email === currentUser.email);
        if (anyUser) return 'red'
        else return 'gray'
    }

    const likeOrDislike = () => {

        let updatedLikes;

        const currentUser = JSON.parse(localStorage.getItem('social-bugg-user'));

        const userPrevious = post.likes.find(like => like.email === currentUser.email);

        if (userPrevious?.email) {
            const remainingLikes = post.likes.filter(like => like.email !== currentUser.email);
            post.likes = remainingLikes;
            updatedLikes = post.likes

            const updated = { ...post, likes: updatedLikes };

            updatePost(postId, updated)
                .then(res => {
                    toast.success('Unliked the post');
                    const updatedPost = res?.data();
                    setPost((updatedPost) => updatedPost);
                });
        }
        else {
            post.likes.push({
                id: currentUser?.id,
                email: currentUser?.email,
                displayName: currentUser?.displayName
            })
            updatedLikes = post.likes;
            const updated = { ...post, likes: updatedLikes };

            const name = currentUser?.displayName;
            updatePost(postId, updated, name)
                .then(res => {
                    toast.success('Liked the post!');
                    const updatedPost = res?.data();
                    setPost((updatedPost) => updatedPost);
                });
        }
    }

    const removeComment = (comment, postId) => {
        const othercomments = comments.filter(cmt => cmt.id !== comment.id);
        post.comments = othercomments;

        const updatedComments = post.comments;
        const updated = { ...post, comments: updatedComments };

        updatePost(postId, updated)
            .then(res => {
                toast.success('Removed a comment');
                const updatedPost = res?.data();
                setPost((updatedPost) => updatedPost);
            });
    }


    return (
        <Defaultlayout>
            {
                (isLoading === true) && <Spinner />
            }
            <div className='flex justify-around items-center md:flex-col'>
                {/* like-section portray */}
                <div className=''>
                    {
                        (showLikes) &&
                        <LikedBy likes={likes} setShowLikes={setShowLikes} />
                    }
                </div>


                {/* post-section portray */}
                <div className='flex justify-center items-center'>
                    {
                        (post?.description?.length > 0) &&
                        <div className='p-4 shadow-lg cursor-pointer'>
                            <div className='flex justify-center items-center space-x-2 mb-2'>
                                <p className='h-10 w-10 rounded-full bg-primary text-white font-semibold flex justify-center items-center'>{user?.displayName.split(' ')[0]}</p>
                                <p>{user?.displayName}</p>
                            </div>
                            <div className='w-full text-center flex justify-center'>
                                <img src={imageURL} alt="" className="h-[500px] w-[500px]" />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center p-2 space-x-3'>
                                    <div className='flex items-center justify-center space-x-1 cursor-pointer'>
                                        <AiFillHeart color={isLiked()} size={25} onClick={likeOrDislike} />
                                        <h1 className='underline font-semibold cursor-pointer' onClick={() => {
                                            setShowLikes(true);
                                            setShowAddComment(false);
                                        }}>{likes?.length}</h1>
                                    </div>
                                    <div className='flex items-center justify-center space-x-1' onClick={() => {
                                        setShowLikes(false);
                                        setShowAddComment(true);
                                    }}>
                                        <AiOutlineComment size={25} />
                                        <h1>{comments?.length}</h1>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <ImShare size={25} color="gray" onClick={()=>navigate(`/share/${postId}`)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <h1 className='text-xl font-semibold text-primary mx-3'>Post</h1>
                                <h1 className='text-primary text-xl p-3 shadow-lg'>{description}</h1>
                            </div>
                            <div className=''>
                                <h1 className='text-xl font-semibold text-primary mx-3'>Comments</h1>
                                {
                                    (comments.length) ?
                                        comments.map(comment => <Comment key={comment.id} originalComment={comment} currentuser={JSON.parse(localStorage.getItem('social-bugg-user'))} removeComment={() => removeComment(comment, postId)}></Comment>)
                                        :
                                        <h1 className='mx-3'>No comments yet</h1>
                                }
                            </div>
                        </div>

                    }
                </div>
                {/* comment-section portray */}
                <div className='md:order-first'>
                    {
                        (showAddComment) &&
                        <AddComment user={JSON.parse(localStorage.getItem('social-bugg-user'))} setShowAddComment={setShowAddComment} post={post} postId={postId} setPost={setPost}></AddComment>
                    }
                </div>
            </div>
        </Defaultlayout>
    );
};

export default Post;