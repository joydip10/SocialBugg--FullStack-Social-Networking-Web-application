import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app, fireDb } from '../firebase.config';


const useFirebase = () => {
    const [user, setUser] = useState({});
    const [logregerror, setError] = useState('');
    const [isLoading, setLoading] = useState(true);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                setUser(user);
                setError('');
            } else {
                setUser({});
                setError('');
            }
            setLoading(false);
        });
    }, [])

    //register a new user
    const signUp = async (name, email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            //saving user name
            await updateName(name)

            //saving the user to the firestore and adding that to the localstore
            const user = userCredential.user;
            const obj = {
                id: user.uid,
                displayName: name,
                email: email,
                photo: userCredential.user.photoURL || ""
            }
            await setDoc(doc(fireDb, "users", user.uid), obj);
            localStorage.setItem('social-bugg-user', JSON.stringify({ ...obj, id: user.uid }));
            setUser(obj);
            setError('');
            toast.success('Signup Successful');
            toast.success(`Logged in as ${obj.displayName}`);
            navigate('/home');
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            toast.error('Signup atempt unsuccessful');
            console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    //login with email and password
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(fireDb, 'users', user.uid));
            localStorage.setItem('social-bugg-user', JSON.stringify({ ...userDoc.data(), id: userDoc.id }));
            setUser(userDoc?.data());
            setError('');
            toast.success('Login Successful');
            toast.success(`Logged in as ${user.displayName}`);
            navigate('/home');
        } catch (error) {
            toast.error('Login atempt unsuccessful');
            setError(error.message);
            console.log(error);
            navigate('/login');
        }
        finally {
            setLoading(false);
        }
    }

    //logout
    const logOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('social-bugg-user');
        }).catch((error) => {

        });
    }

    //Name updatiop during sign up
    const updateName = async (name) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            setError('');
        } catch (error) {
            setError(error.message);
        }
    }

    //addingPosts
    const addPost = (image, description) => {
        setLoading(true);

        const storage = getStorage();
        const storageRef = ref(storage, `/posts/${image.name}`);

        uploadBytes(storageRef, image)
            .then((snapshot) => {
                getDownloadURL(ref(storage, `/posts/${image.name}`))
                    .then((url) => {
                        addDoc(collection(fireDb, 'posts'), {
                            description,
                            imageURL: url,
                            likes: [],
                            comments: [],
                            user: JSON.parse(localStorage.getItem('social-bugg-user'))

                        }).then(() => {
                            toast.success('Post uploaded successfully!');
                            navigate('/home');
                        })
                            .catch((error) => {
                                toast.error('Post upload is unsuccessful');
                            })
                            .finally(() => {
                                setLoading(false);
                            })
                    })
            })
    }

    //retreive all users
    const getUsers = async () => {
        setLoading(true);
        const users = [];
        const docs = await getDocs(collection(fireDb, 'users'));
        docs.forEach((doc) => {
            users.push(doc.data());
        })
        setLoading(false);
        return users;
    }

    //Retrieve a user
    const getUser=async (userId)=>{
        setLoading(true);

        const q = doc(fireDb, 'users', userId);
        const document = await getDoc(q);
        
        setLoading(false);
        return document;
    }


    //update a user --> updating for sharing a post
    const updateUser = async (userId, updated) => {
        setLoading(true);
        let updatedDoc

        const q = doc(fireDb, 'users', userId);
        updatedDoc = await setDoc(q, updated);
        setLoading(false);
        
        return updatedDoc;
    }


    //retrieve all posts
    const getPosts = async () => {
        setLoading(true);
        const posts = [];
        const docs = await getDocs(collection(fireDb, 'posts'));
        docs.forEach((doc) => {
            const id = doc.id;
            posts.push({ id, ...doc.data() });
        })
        setLoading(false);
        return posts;
    }
    
    //retrive a single post
    const getPost = async (postId) => {
        setLoading(true);
        const q = doc(fireDb, 'posts', postId);
        const document = await getDoc(q);
        setLoading(false);
        return document;
    }

    //update a single post
    const updatePost = async (postId, updated) => {
        setLoading(true);
        let updatedDoc

        try {
            const q = doc(fireDb, 'posts', postId);
            updatedDoc = await setDoc(q, updated);
            setLoading(false);
        } catch (error) {
            toast.error(`Something went wrong`);
        }

        return updatedDoc;
    }

    //delete a single post
    const deletePost= async (postId)=>{
        setLoading(true);
        await deleteDoc(doc(fireDb, "posts", postId));
        setLoading(false);
    }

    return {
        user, logregerror, setError, isLoading, signUp, signIn, logOut, addPost, getPosts, getPost, updatePost, deletePost, getUsers,getUser, updateUser
    }
};

export default useFirebase;