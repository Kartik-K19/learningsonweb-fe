// CommentSection.js

import React, { useState,useContext, useEffect } from 'react';
import {getToken } from "../helpers";
import { useNavigate, useParams} from "react-router-dom";
import Comment from './Comment';
import "./CommentSection.css"
import { Context } from '../Context/context';
import { API } from '../constant';

const CommentSection = (props) => {
  const {id} = useParams();
  const {user} = useContext(Context);
 
 const navigate = useNavigate()
  
  const[text,setText] = useState("");
  

  // Function to add a new comment to the comments array
  
  const onFinish = async (data) => {
    
  fetch(`${API}/blogs/${id}`, {
    method: 'PUT',
    headers: {
        "Authorization": `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())

  .catch(error => console.error(error));

  props.loading((prev)=>prev+1);
  
}

const handleChange = (event) => {
  setText(event.target.value)
};



const handleSubmit = (event) => {
   
  event.preventDefault();

  if(text===""){
    console.log("empty message");
  }
  else if(user){
  const dataObj = {
    comment:text,
    users_permissions_user:{
      connect:[user?.id]
    }
  }
   let comments = [...props.comments]
  comments.push(dataObj)
  const updatedComments = {
    data:{
      comment:comments
    }
  }
  
  // pass the form values to your onFinish function
  onFinish(updatedComments);
  setText("");
}
  else{
    navigate(`/login`)
  }
}

useEffect(()=>{
  
},[text])



  return (
    <div>
      {/* Render the list of comments */}
      {props.comments?.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.comment}
          author={comment?.users_permissions_user?.data?.attributes?.username}
          
        />
      ))}
      {/* Render a form to add new comments */}
      <form className='comment-form' onSubmit={handleSubmit}>
        {/* Render input fields for comment content, author, etc. */}
        {/* ... */}
        <h4>Add Comment</h4>
        <input type="text" name="comment" value={text} onChange={handleChange}/>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;
