import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //because the parameter is gonna be passed in the post,i.e. post._id
import {useAuthContext} from '../hooks/useAuthContext.js'

import styles from '../styles/styles.module.scss'
import { format } from 'date-fns';


const DiaryPost = ()=>{
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user } = useAuthContext();

    useEffect(()=>{
        const fetchPost = async ()=>{
            const response = await fetch(`https://diary-backend-plmn.onrender.com/api/posts/${id}`,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if(response.ok){
                setPost(json);
            }
        }

        if(user) fetchPost();
    } , [user,id]);

    if(!post){
        return null;
    }
    return (
        <div className={styles.diaryPost}>
            <h2>{post.title}</h2>
            
            <div>{ format(new Date(post.date), 'MMMM d, y') }</div>
            
            <p>{post.content}</p>
        </div>
    )
};

export default DiaryPost;