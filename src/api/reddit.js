// File         : reddit.js
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the functions that will use reddit api to get the posts data and formatting the raw data.
import axios from "axios";

const LIMIT = 10;

// Function   : getSubreddit
// Description: This function will try to get the top 10 posts with sort option "hot" with the user inpputed keyword.
// Parameters : subredditName - subreddit string that user inputted for search.
// Returns    : post_data: array of the sorted top 10 post data that is parsed from the raw data.
const getSubreddit = async (subredditName) => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subredditName}/hot.json?limit=${LIMIT}`);
      const post_data = parseHotPostInfoFromData(response.data.data.children);
      return post_data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve post data");
    }
  };

// Function   : parseHotPostInfoFromData
// Description: This function will try to parse post id, title, and post score from the raw data.
//              It will also filter the stickied posts (like moderator pinned posts)
// Parameters : data - full raw data of 10 posts.
// Returns    : parse_data: array of the post data that is parsed from the raw data.
const parseHotPostInfoFromData = (data) =>{
    let parse_data = [];
    data = data.filter(element => element.data.stickied === false);   //don't include the stickied posts
    data.forEach(function(elements,index){
        parse_data[index] = {id:elements.data.id, title: elements.data.title, score:elements.data.ups};
    })

    if(parse_data.length === LIMIT)
    {
        return parse_data;
    }
    
};

// Function   : getPostById
// Description: This function will try to get the post information with the post id that was saved to Web storage.
// Parameters : postId - post id that is stored in web storage (local storage)
// Returns    : post_data: arrat of the post's raw data.
const getPostById = async(postId) =>{
    try {
        const response = await axios.get(`https://www.reddit.com/comments/${postId}/.json`);
        const post_data = parseFavPostInfoFromData(postId, response.data[0].data.children[0].data);
        return post_data;
      } catch (error) {
        console.log(error);
      }

};

// Function   : parseFavPostInfoFromData
// Description: This function will try to parse the raw data of the favourited posts.
//              It will retrive title and scores.
// Parameters : postId - post id that is stored in web storage (local storage)
//              data - array of raw data.
// Returns    : parse_data: the post's parsed data array.
const parseFavPostInfoFromData = (postId, data) =>{
    let parse_data = {id:postId, title: data.title, score:data.ups};
    return parse_data;
};



export { getSubreddit, getPostById };