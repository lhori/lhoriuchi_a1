import axios from "axios";

const LIMIT = 10;

const getSubreddit = async (subedditName) => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subedditName}/hot.json?limit=${LIMIT}`);
      const post_data = parseHotPostInfoFromData(response.data.data.children);
      return post_data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve post data");
    }
  };

const parseHotPostInfoFromData = (data) =>{
    let parse_data = [];
    data = data.filter(element => element.data.stickied === false);   
    data.forEach(function(elements,index){
        parse_data[index] = {id:elements.data.id, title: elements.data.title, score:elements.data.ups};
    })

    if(parse_data.length === LIMIT)
    {
        return parse_data;
    }
    
};

const getPostById = async(postId) =>{
    try {
        const response = await axios.get(`https://www.reddit.com/comments/${postId}/.json`);
        const post_data = parseFavPostInfoFromData(postId, response.data[0].data.children[0].data);
        return post_data;
      } catch (error) {
        console.log(error);
      }

};

const parseFavPostInfoFromData = (postId, data) =>{
    let parse_data = {id:postId, title: data.title, score:data.ups};
    return parse_data;
};



export { getSubreddit, getPostById };