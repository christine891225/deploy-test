import styled from 'styled-components';
import { GlobalStyle } from './globalStyle';
import userIcon from '../icons/user(1).png';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

import { Grid, GridItem } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import instance from "../axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 80vw;
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

const UserBackground = styled.div`
  background-color: #001c55;
  border-radius: 50%;
  width: 20vh;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StatsContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 1vw;
`;

const btnStyle = {
  padding: '4px 16px',
  marginBottom: '2vh',
  backgroundColor: '#001C55',
  color: '#e6e1c5' 
}

export default function PersonalInfo(

) {
  const { userId, setUserId } = useContext(UserContext);
  const [user, setUser] = useState('');
  const [mail, setMail] = useState('');
  // Set to -1 to ensure the correct number is set
  const [sharedPost, setSharedPost] = useState(-1);
  const [bookmarkPost, setBookmarkPost] = useState(-1);
  const [likePost, setLikePost] = useState(-1);

  const getUser = async() => {
    await instance
      .get(`/getUserById/?user_id=${userId}`)
      .then((res) => {
        console.log(res);
        setUser(res.data.contents.user_name);
        setMail(res.data.contents.user_email);
      })
  }

  const countPostsByAuthorId = async () => {
    try {
        await instance
          .get(`/countPostsByAuthorId/?author_id=${userId}`) 
          .then((response) => {
            console.log("countPostsByAuthorId", response);
            setSharedPost(response.data.contents);
          }
        );  
    } catch (error) {
        console.log(error)
    }
  }

  const countBookmarkPostByUserId = async () => {
    try {
        await instance
          .get(`/countBookmarkPostByUserId/?user=${userId}`)
          .then((response) => {
            console.log("countBookmarkPostByUserId", response);
            setBookmarkPost(response.data.contents);
          }
        );        
    } catch (error) {
        console.log(error)
    }
  }

  const countLikesByUserId = async () => {
    try {
        await instance
          .get(`/countLikesByUserId/?user_id=${userId}`)
          .then((response) => {
            console.log("countLikesByUserId", response);
            setLikePost(response.data.contents);
          }
        );        
    } catch (error) {
        console.log(error)
    }
  }

  const logOut = () => {
    console.log("logout!");
    localStorage.removeItem('userId');
    setUserId();
  }

  useEffect(() => {
    getUser();
    countBookmarkPostByUserId();
    countPostsByAuthorId();
    countLikesByUserId();
  }, [])

  return (
    <GlobalStyle>
      <Container>
      <Grid 
        templateColumns='repeat(12, 1fr)'
        margin={0}
      >
        <GridItem colSpan={2} justifySelf="center" alignSelf="center" mr={10}>
          <UserBackground>
            <img src={userIcon} alt='user' width='100vw'/>
          </UserBackground>
        </GridItem>
        <GridItem colSpan={6} justifySelf="start" alignSelf="center">
          <UserContainer>
            <NameContainer>
              <p className='name'>{user}</p>
            </NameContainer>
            <p className='email'>{mail}</p>
          </UserContainer>
        </GridItem>
        <GridItem colSpan={2} colStart={9}justifySelf="center" alignSelf="center">
          <StatsContainer>
            <p>已發佈文章數 {sharedPost}</p>
            <p>已收藏文章數 {bookmarkPost}</p>
            <p>已按讚文章數 {likePost}</p>
          </StatsContainer>
        </GridItem>
        <GridItem colSpan={1} colStart={12}justifySelf="end" alignSelf="end">
          <Button size='md' variant='solid' style={btnStyle} onClick={logOut} >登出</Button>
        </GridItem>
      </Grid>
      </Container>
      <Grid

      >

      </Grid>
    </GlobalStyle>
  );
}