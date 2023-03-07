import React, {useState} from 'react'
import {Grid, Alert, Box, Typography, CardActions, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

import { CustomButtons } from '../../common/Button/CustomButtons';
import CommonCard from '../../common/Card/Card';
import SearchBox from '../../common/SearchBox/SearchBox';
import { searchBoxStyles, GridStyles } from '../styles'
import { getSubreddit }  from '../../api/reddit';


const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [redditData, setRedditData] = useState([]);

    const handleChange = (subedditName) =>{
        console.log(subedditName);
        setSearchText(subedditName);

    };

    const searchReddit = async () => {
        if(!searchText){
            setAlertOpen(true);
        }
        else
        {
            setAlertOpen(false);
            console.log("search text: ", searchText);
            const data = await getSubreddit(searchText);
            const updateData = data.map((post) => ({ ...post, isFavourited: false }));
            console.log(updateData);
            const favouritePosts = Object.values(localStorage);
            for(let i = 0; i< updateData.length; i++)
            {
                if(favouritePosts.includes(updateData[i].id)){
                    updateData[i].isFavourited = true;
                }
            }
            setRedditData(updateData);
            
            
        }
    }

    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            searchReddit();
        }
    }

    const getSearchBox = () =>{
        return(
            <Box sx={searchBoxStyles.wrapper}>
                <SearchBox
                    placeholder={"Search by name of the subreddit"}
                    onChange = {(e) => handleChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    searchBarWidth='640px'
                />
                <CustomButtons
                 variant="contained"
                 onClick={searchReddit}
                 size="large"
                 sx={searchBoxStyles.addUserButton}
                 >
                    Search
                </CustomButtons>
            </Box>
        )
    }

    const handleFavouriteClick = (postId) =>{

            //update data with favourite state
            const updateData = redditData.map((post) => post.id === postId ? { ...post, isFavourited: !post.isFavourited} : post);
            //set the updated data
            setRedditData(updateData);

            //create new key
            const newKey = localStorage.length + 1;
            
            //if the post is favourited save the post to the local storage
            if(updateData.find(post => post.id === postId && post.isFavourited)){
                localStorage.setItem(newKey, postId);
            }
            else
            {
                //if the post is already favourited then remove item
                for(let i=0; i< localStorage.length; i++){
    
                    if(localStorage.getItem(localStorage.key(i)) === postId){
                        localStorage.removeItem(localStorage.key(i));
                        break;
                    }
                }
            }
    }
    

    const getContent = () =>{
        if (!redditData) {
            return (
                <Typography variant="body1" component="div">
                No data found. Please enter a subreddit name to search.
              </Typography>
            );
          }
        return(
        <div>
        {redditData.map((post) => (
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
                            aria-label="add to favorites"
                            color={post.isFavourited ? "secondary" : "inherit"}
                            onClick={() => handleFavouriteClick(post.id)}>
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </div>
            }/>
        ))}
        </div>
        );
    }

    return(
        <Grid item xs={8} sx={GridStyles}>
            <Alert severity="error" sx={{ display: alertOpen ? 'block' : 'none' }}>
                Please enter a subreddit name to search.
            </Alert>
            <CommonCard header={getSearchBox()} content={getContent()}/>
            
        </Grid>
    )

}

export default Search