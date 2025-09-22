import React, { useEffect, useState } from "react";
import api from "./api"; // make sure api.js points to your Laravel backend

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add new post
  const addPost = async () => {
    if (!title || !content) return alert("Title and content required!");
    try {
      await api.post("/posts", { title, content });
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error("API error:", err);
    }
  };

  // Edit a post
  const editPost = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  // Update post
  const updatePost = async () => {
    try {
      await api.put(`/posts/${editingId}`, { title, content });
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      console.error("API error:", err);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div>
      <h2>Posts</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        {editingId ? (
          <button onClick={updatePost}>Update Post</button>
        ) : (
          <button onClick={addPost}>Add Post</button>
        )}
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "15px" }}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <button onClick={() => editPost(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
