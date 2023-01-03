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

import instance from '../axios'


const Container = styled.div`
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  display-direction: row;
  flex-wrap: wrap;
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
  margin-bottom: 1.5vh;
`;

export default function GroupPost({
  post,
}) {
  const { userId, bookmarkPostCount, setBookmarkPostCount, likePostCount, setLikePostCount } = useContext(UserContext);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [author, setAuthor] = useState('');
  
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.id === "like") {
      setLike();
    } else if (e.target.id === "bookmark") {
      setBookmark();
    } else {
      navPost();
    }
  }

  const navPost = () => {
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

  const getAuthor = async() => {
    await instance
      .get(`/getUserById/?user_id=${post.author_id}`)
      .then((res) => {
        // console.log(res);
        setAuthor(res.data.contents.user_name);
      })
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

  const createBookmarkPost = async() => {
    await instance
      .post(`/createBookmarkPost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("createBookmarkPost", res);
      })
    setBookmarkPostCount(bookmarkPostCount + 1);
  }

  const deleteBookmarkPost = async() => {
    await instance
      .post(`/deleteBookmarkPost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("deleteBookmarkPost", res);
      })
    setBookmarkPostCount(bookmarkPostCount - 1);
  }

  const likePost = async() => {
    await instance
      .post(`/likePost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("likePost", res);
      })
    setLikePostCount(likePostCount + 1);
  }

  const unlikePost = async() => {
    await instance
      .post(`/unlikePost/?user_id=${userId}&post_id=${post.post_id}`)
      .then((res) => {
        console.log("unlikePost", res);
      })
    setLikePostCount(likePostCount - 1);
  }

  useEffect(() => {
    getAuthor();
    getBookmark();
    getLike();
  }, [])

  useEffect(() => {
    getLike();
    getBookmark();
  }, [bookmarkPostCount, likePostCount])


  return (
    <div>
      <GlobalStyle>
        <Container 
          onClick={(e) => handleClick(e)}
          id="container"
        >
          {/* 一張 Card 共分4個部分 */}
          <Card variant="outline" padding={4} margin={4}> 
              {/* 第一部分：標題 + like + save */}
              <Grid 
                templateColumns='repeat(7, 1fr)'
                margin={1}
              >
                <GridItem colSpan={5}>
                  <p style = {{fontSize: '20px', marginTop: '0em'}}>{post.post_name}</p>
                </GridItem>
                <GridItem colSpan={1} justifySelf="center" alignSelf="center">
                  <Image src={isLike? likeY:likeN} alt='like' id="like" boxSize="20px"></Image>
                </GridItem>
                <GridItem colSpan={1} justifySelf="center" alignSelf="center">
                  <Image src={isBookmark? bookmarkY:bookmarkN} alt='bookmark' id="bookmark" boxSize="20px"></Image>
                </GridItem>
              </Grid>
              {/* 第二部分：文章intro */}
              <Grid 
                margin={1}
                mt={4}
                mb={0}
                height={32}
              >
                <p style = {{fontSize: '14px'}}>{post.post_intro}</p>
              </Grid>
              {/* 第三部分：tags */}
              <Grid 
                margin={1}
                height={24}
              >
                <TagContainer>
                  {/* TODO: fontsize of tags can be smaller */}
                  {
                    post.tags.map((tag) => (
                      <Tag className='cardTags'># {tag}</Tag>
                    ))
                  }
                </TagContainer>
              </Grid>
              {/* 第四部分：時間 & 作者 */}
              <Grid 
                templateColumns='repeat(8, 1fr)'
                margin={1}
                mt={8}
              >
                <GridItem colSpan={1} alignSelf="center">
                  <Image src={clock} alt='clock' boxSize="16px"></Image>
                </GridItem>
                <GridItem colSpan={3} alignSelf="center">
                  <p className='cardInfo'>{post.post_date.split('T')[0]}</p>
                </GridItem>
                <GridItem colSpan={1} alignSelf="center">
                  <Image src={user} alt='user' boxSize="16px"></Image>
                </GridItem>
                <GridItem colSpan={3} alignSelf="center">
                  <p className='cardInfo'>{author}</p>
                </GridItem>
              </Grid>
          </Card>
        </Container>
      </GlobalStyle>
    </div>
  );
}