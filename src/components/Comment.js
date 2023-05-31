// Comment.js

import React from 'react';

const Comment = ({ content, author }) => {
  return (
    <div>
      <p>{content}</p>
      <p>By: {author}</p>
      <hr style={{margin:"5px 0"}}/>
    </div>
  );
};

export default Comment;
