import styled from 'styled-components';
import { GlobalStyle } from './globalStyle';
import clock from '../icons/clock.png';
import user from '../icons/user.png';
import bookmarkY from '../icons/bookmark.png';
import bookmarkN from '../icons/bookmark(1).png';
import likeY from '../icons/heart(1).png';
import likeN from '../icons/heart.png';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

import { Grid, GridItem } from '@chakra-ui/react'
import { Card } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

import instance from "../axios";

const Container = styled.div`
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  display-direction: row;
  flex-wrap: wrap;
  height: 18vh;
`;

const Tag = styled.div`
  background-color: #f3f0e2;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  padding-left: 0.25vw;
  padding-right: 0.25vw;
  margin-right: 0.25vw;
  border-radius: 5px;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

export default function SearchCard({
  post
}) {
  const { userId } = useContext(UserContext);
  const [authorName, setAuthorName] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.id !== "like" && e.target.id !== "bookmark")
      navPost();
  }

  const navPost = (post_id) => {
    navigate(`/post/${post.post_id}`); 
  }

  const setLike = () => {
    if (isLike) {
      setIsLike(false);
      unlikePost();
    } else {
      setIsLike(true);
      likePost();
    }
  }

  const setBookmark = () => {
    if (isBookmark) {
      setIsBookmark(false);
      deleteBookmarkPost();
    } else {
      setIsBookmark(true);
      createBookmarkPost();
    }
  }

  const createBookmarkPost = async() => {
    await instance
      .post(`/createBookmarkPost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("createBookmarkPost", res);
      })
    setBookmarkCount(bookmarkCount + 1);
  }

  const deleteBookmarkPost = async() => {
    await instance
      .post(`/deleteBookmarkPost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("deleteBookmarkPost", res);
      })
    setBookmarkCount(bookmarkCount - 1);
  }

  const likePost = async() => {
    await instance
      .post(`/likePost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("likePost", res);
      })
    setLikeCount(likeCount + 1);
  }

  const unlikePost = async() => {
    await instance
      .post(`/unlikePost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("unlikePost", res);
      })
    setLikeCount(likeCount - 1);
  }

  const getBookmark = async() => {
    await instance
      .get(`/getBookmarkPostsByUserIdPostId/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        // console.log("getBookmark", res);
        if(res.data.contents === null)
          setIsBookmark(false);
        else
          setIsBookmark(true);
      })
  }

  const getLike = async() => {
    await instance
      .get(`/getLikesPostsByUserIdPostId/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        // console.log("getLike", res);
        if(res.data.contents === null)
          setIsLike(false);
        else
          setIsLike(true);
      })
  }

  const getAuthorName = async() => {
    await instance
      .get(`/getUserById/?user_id=${post.author_id}`)
      .then((res) => {
        // console.log(res);
        setAuthorName(res.data.contents.user_name);
      })
  }

  const getLikesByPostId = async() => {
    await instance
      .get(`/getLikesByPostId/?post_id=${post.post_id}`)
      .then((res) => {
        // console.log(res);
        setLikeCount(res.data.contents);
      })
  }

  const countBookmarkByPostId = async() => {
    await instance
      .get(`/countBookmarkByPostId/?post_id=${post.post_id}`)
      .then((res) => {
        // console.log(res);
        setBookmarkCount(res.data.contents);
      })
  }

  useEffect(() => {
    getAuthorName();
    getLike();
    getBookmark();
    getLikesByPostId();
    countBookmarkByPostId();
  }, [post])

  return (
    <div>
      <GlobalStyle>
      <Container id="container" onClick={(e) => handleClick(e)} >
          <Card variant="outline" p={4} mt={4}>
            {/* 一張 Card 共分4個部分 */} 
            <Grid 
              templateColumns='repeat(24, 1fr)'
            >
                {/* 第一部分：標題 + 時間 + 作者 */}
                <GridItem colSpan={8}>
                  <p style = {{fontSize: '20px', marginTop: '0em'}}>{post.post_name}</p>
                  <Grid 
                    templateColumns='repeat(6, 1fr)'
                    m={1}
                    mt={4}
                  >
                    <GridItem colSpan={1} alignSelf="center">
                      <Image src={clock} alt='clock' boxSize="14px"></Image>
                    </GridItem>
                    <GridItem colSpan={5} alignSelf="center">
                      <p className='searchCardInfo'>{post.post_date.split('T')[0]}</p>
                    </GridItem>
                  </Grid>
                  <Grid 
                    templateColumns='repeat(6, 1fr)'
                    m={1}
                  >
                    <GridItem colSpan={1} alignSelf="center">
                      <Image src={user} alt='user' boxSize="14px"></Image>
                    </GridItem>
                    <GridItem colSpan={5} alignSelf="center">
                      <p className='searchCardInfo'>{authorName}</p>
                    </GridItem>
                  </Grid>
                </GridItem>
                {/* 第二部分：tags */}
                <GridItem colSpan={4} justifySelf="start" alignSelf="start">
                    <TagContainer>
                      {
                        post.tags.map((tag) => (
                          <Tag className='cardTags'># {tag}</Tag>
                        ))
                      }
                    </TagContainer>
                </GridItem>
                {/* 第三部分：intro */}
                <GridItem colSpan={8} justifySelf="start" alignSelf="start" mt={1} ml={4}>
                  <p className='searchCardInfo'>{post.post_intro}</p>
                </GridItem>
                {/* 第四部分：icons */}
                <GridItem colSpan={3} colStart={22} justifySelf="center" alignSelf="start" mr={-6} mt={1}>
                  <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                    <GridItem alignSelf="center">
                      <Image src={isLike? likeY:likeN} alt='like' boxSize="18px" id="like" onClick={() => setLike()}></Image>
                    </GridItem>
                    <GridItem alignSelf="center">
                      <p className='searchCardInfo fig' >{likeCount}</p>
                    </GridItem>
                    <GridItem colSpan={1} alignSelf="center">
                      <Image src={isBookmark? bookmarkY:bookmarkN} alt='bookmark' boxSize="18px" id="bookmark" onClick={() => setBookmark()}></Image>
                    </GridItem>
                    <GridItem colSpan={1} alignSelf="center">
                      <p className='searchCardInfo fig'>{bookmarkCount}</p>
                    </GridItem>
                  </Grid>
                </GridItem> 
            </Grid> 
          </Card>
        </Container>
      </GlobalStyle>
    </div>
  );
}