import React, { useEffect, useState } from 'react'

import {Grid, Typography, CardActions, IconButton} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import DeleteIcon from '@mui/icons-material/Delete';

import { GridStyles } from '../styles'
import CommonCard from '../../common/Card/Card';
import { getPostById } from '../../api/reddit';

const getSavedPosts = () => {
    const keys = Object.keys(localStorage);
    const postIds = [];
    for(let i = 0; i <keys.length; i++){
        const key = keys[i];
        // Ignore any keys that are not numbers
        if (!isNaN(parseInt(key))) {
            const postId = localStorage.getItem(key);
            postIds.push(postId);
        }
    }
    return postIds;
}

const Favourites = () => {
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(()=>{

        const getSavedPostInfo = async () => {
            const postIds = getSavedPosts();
            const postInfo = await Promise.all(postIds.map((postId)=>getPostById(postId)))
            setSavedPosts(postInfo)
        }
        getSavedPostInfo()
    }, [])

    const removePostFromFavourites = (postId) =>{
        const keys = Object.keys(localStorage);
        for(let i = 0; i <keys.length; i++){
            const key = keys[i];
            if(localStorage.getItem(key) === postId){
                localStorage.removeItem(key);
                break;
            }
        }
        setSavedPosts(savedPosts.filter(post => post.id !== postId));

    }

    const getContent = () =>{
        if (savedPosts.length === 0 || !savedPosts || savedPosts[0] === undefined) {
            return (
                <Typography variant="body1" component="div">
                No favourite posts yet!
              </Typography>
            );
          }
        else{
          return(
            <div>
            {savedPosts.map((post) => (
                <CommonCard key={post.id} content={
                    <div>
                        <a href={`https://www.reddit.com/${post.id}`} target="_blank" rel="noopener noreferrer">
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                        </a>
                        <CardActions disableSpacing
                                     style={{ display: "flex", justifyContent: "flex-start" }}>
                            <ThumbsUpDownIcon sx={{marginLeft:'5px', marginRight: '5px'}} fontSize="medium" />
                            {post.score}
                            <IconButton 
                                aria-label="comment on this post"
                                onClick={() => window.open(`https://www.reddit.com/${post.id}`)}>
                            <CommentIcon />
                            </IconButton>
                            <IconButton 
                                aria-label="delete from favourites"
                                onClick={() => removePostFromFavourites(post.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </div>
                }/>
            ))}
            </div>
            );
        }

    }
    return(
        <Grid item xs={8} sx={GridStyles}>
            <CommonCard content={getContent()}/>
        </Grid>
    )
}

export default Favourites