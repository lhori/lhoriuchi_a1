// File         : Search.jsx
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the search page component and functionality.

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

// Function   : Search
// Description: This function is for handling the user input for the search bar, displaying alerts, button actions, and displaying the search result.
// Parameters : None
// Returns    : the components that will show search bar, search button, and card component with post information.
const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [redditData, setRedditData] = useState([]);

    // Function   : handleChange
    // Description: This function is for handling the user input inside the search bar text input.
    //              It will set the inpputed words as a search text
    // Parameters : subredditName - inputted string.
    // Returns    : None
    const handleChange = (subredditName) =>{
        setSearchText(subredditName);

    };

    // Function   : handleKeyPress
    // Description: This function is for handling user key input. It will start search when user press "Enter" key.
    // Parameters : None
    // Returns    : None
    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            searchReddit();
        }
    }

    // Function   : handleFavouriteClick
    // Description: This function is for handling favourite icon. When the favourite icon is pressed, it will update the data and storage the post id.
    //              When it is clicked again, it will unfavourite the posts and remove from the local storage.
    // Parameters : postId - string post id of the post.
    // Returns    : None
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

    // Function   : searchReddit
    // Description: This function is for searching the keyword.
    //              When it gets data back using reddit api, it will update the data and set that data.
    //              If the search text is blank or any errors, it will set the Alert component to be shown.
    // Parameters : None
    // Returns    : None
    const searchReddit = async () => {
        if(!searchText){
            setAlertOpen(true);
        }
        else
        {
            try{
                const data = await getSubreddit(searchText);
                const updateData = data.map((post) => ({ ...post, isFavourited: false }));
                const favouritePosts = Object.values(localStorage);
                for(let i = 0; i< updateData.length; i++)
                {
                    if(favouritePosts.includes(updateData[i].id)){
                        updateData[i].isFavourited = true;
                    }
                }
                setRedditData(updateData);
                setAlertOpen(false);
            } catch (error) {
                console.error(error);
                setAlertOpen(true);
              }        
        }
    }

    // Function   : getSearchBox
    // Description: This function is for setting up and displaying the search box.
    // Parameters : None
    // Returns    : Components to render the search box.
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

    // Function   : getContent
    // Description: This function is to display the post information with certain arrtibutes setted up.
    // Parameters : None
    // Returns    : card object that will contain the sorted top 10 posts with format.
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
                Cannot find data....Please enter valid subreddit name to search.
            </Alert>
            <CommonCard header={getSearchBox()} content={getContent()}/>
            
        </Grid>
    )

}

export default Search