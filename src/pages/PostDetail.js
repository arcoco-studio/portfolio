import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub-Flavored Markdown 지원

import postData from 'components/data/PostsData';

import 'assets/styles/pages/PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const [postContent, setPostContent] = useState("");

  // Find the post from the postData list
  const post = postData.find((p) => p.id === postId);
  const publicPostPath = process.env.PUBLIC_URL + post.contentPath;

  useEffect(() => {
    if (post) {
      // Fetch the content of the post from the file
      fetch(publicPostPath)
        .then((response) => response.text())
        .then((data) => {
          setPostContent(data);
        })
        .catch((error) => console.error("Error loading post:", error));
    }
  }, [post]);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div className="post-detail">
      <Link to="/posts" className="back-button">← Back to Posts</Link>
      <h1>{post.title}</h1>
      <article style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
        {/* ReactMarkdown으로 Markdown 내용을 렌더링 */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{postContent}</ReactMarkdown>
      </article>
    </div>
  );

};

export default PostDetail;