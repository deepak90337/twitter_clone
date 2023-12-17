import React from 'react'
import { Button } from '@mui/material'
import axios from 'axios';

function DeletePost() {

const deleteFlaggedPost = async (postId) => {
  try {
    const response = await axios.delete(`https://btwitter.vercel.app/deleteOffensivePost`);
    if (response.status === 200) {
      console.log('Post deleted successfully');
      alert("All offensive posts are deleted");
    } else {
      console.error('Error deleting post');
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <h1 className='pageTitle'>This page is for content moderation</h1>
      <div>
        <p>
            Click Below button to delete all Offensive Post
        </p>
        <Button className="tweetBox__tweetButton" onClick={deleteFlaggedPost} type="submit">Delete</Button>
      </div>
    </div>
  )
}

export default DeletePost
