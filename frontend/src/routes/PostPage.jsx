import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Post from '../components/Post';
import instance from "../axios";
import { GlobalStyle } from '../components/globalStyle';

const PageBackground = styled.div`
  background-color: #e6e1c5;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function PostPage({

}) {
  const post_id = useParams().id;
  const [post, setPost] = useState();

  useEffect(() => {
    getPost();
  }, [])

  const getPost = async() => {
    await instance
    .get(`/getPostById/?post_id=${post_id}`)
    .then((res) => {
      console.log("post", res);
      setPost(res.data.contents[0]);
    })
  }

  return (
    <div>
      <GlobalStyle>
      <PageBackground>
        <NavBar />
          {
            post? <Post post={post}/> : <></>
          }
      </PageBackground>
      </GlobalStyle>
    </div>
  );
}