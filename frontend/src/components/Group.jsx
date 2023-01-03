import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import GroupHeader from "./GroupHeader";
import GroupPost from "./GroupPost";
import { UserContext } from '../App';
import { GlobalStyle } from './globalStyle';

import { SimpleGrid } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'

import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Container = styled.div`
  padding: 1.5vh 3vw 1.5vh 3vw; // 上右下左
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

export default function Group({
  groupName, type, action
}) {
  const { userId, bookmarkPostCount } = useContext(UserContext);
  const [ posts, setPosts ] = useState([]);

  function sortNew(a, b) {
    let dateA = new Date(a.post_date.replace('T', ' ').replace(/-/g,'/'));
    let dateB = new Date(b.post_date.replace('T', ' ').replace(/-/g,'/'));
    if (dateA < dateB) {
      return -1;
    } else if (dateB < dateA) {
      return 1;
    } else { 
      return 0; }
  };

  function sortLike(a, b) {
    let likeA = a.likes;
    let likeB = b.likes;
    if (likeA < likeB) {
      return -1;
    } else if (likeB < likeA) {
      return 1;
    } else { return 0; }
  };

  const getPosts = async () => {
    try {
        if (groupName === "最新文章") {
          const response = await instance.get('/getPosts');
          setPosts(response.data.contents.sort(sortNew).reverse().slice(0,4));
        } else if (groupName === "熱門文章") {
          const response = await instance.get('/getPosts');
          setPosts(response.data.contents.sort(sortLike).slice(0,4));
        } else if (groupName === "收藏文章") {
          await instance
            .get(`/getBookmarkPostByUserId/?user_id=${userId}`)
            .then((res) => {
              setPosts(res.data.contents.reverse());
            })
        } else if (groupName === "已發佈文章") {
          await instance
            .get(`/getPostsByAuthorId/?author_id=${userId}`)
            .then((res) => {
              setPosts(res.data.contents.reverse());
            })
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])
  
  useEffect(() => {
    getPosts()
  }, [bookmarkPostCount])

  return (
    <div>
    <GlobalStyle>
    <Container>
      <GroupHeader groupName={groupName} />
      { posts === [] ? (
        <Center h='200px' color='001C55'>
          <p className='no_content'>還沒有任何{type}文章 快去{action}吧！</p>
        </Center>
      ): (
        <SimpleGrid columns={4}>
        {
          posts.map((post) => (
              (groupName === "最新文章" || groupName === "熱門文章")? (
                  <GroupPost post={post} userId={userId}/>
            ) : (
              <GroupPost post={post} userId={userId}/>
            )
          ))
        }
      </SimpleGrid>
      )}
    </Container>
    </GlobalStyle>
    </div>
  )
}