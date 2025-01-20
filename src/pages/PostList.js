import React, { useState } from "react";
import { Link } from "react-router-dom";
import postData from 'components/data/PostsData';

import 'assets/styles/pages/PostList.css';

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);


  console.log(currentPage, postsPerPage, indexOfFirstPost, currentPosts);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPostDate = (id) => {
    let postDate  = id.slice(0,8);
    let postYear  = postDate.slice(0,4);
    let postMonth = postDate.slice(4,6);
    let postDay   = postDate.slice(6,8);

    return postYear+'-'+postMonth+'-'+postDay;
  };

  return (
    <div className="post-page">
      <header className="post-list-header">
        <h1>Posts</h1>
      </header>
      <div className="post-list">
        <ul>
        {currentPosts.map((post,postIndex) => (
          <li key={post.id} className={`${postIndex === 0 ? "firstTopBorder" : "" }`}>
            <div>
              <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
              <span>{getPostDate(post.id)}</span>
            </div>
          </li>
        ))}
        </ul>
      </div>
      <div className="post-pagination-wrapper">
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(postData.length / postsPerPage) },
            (_, i) => (
              <span
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </span>
            )
          )}
        </div>
      </div>        
    </div>
  );
};

export default PostList;