import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clock from '../icons/clock.png';
import user from '../icons/user.png';
import bookmarkY from '../icons/bookmark.png';
import bookmarkN from '../icons/bookmark(1).png';
import likeY from '../icons/heart(1).png';
import likeN from '../icons/heart.png';
import { UserContext } from '../App';
import instance from "../axios";
import { GlobalStyle } from './globalStyle';


import { Grid, GridItem } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'


const GroupBackgroud = styled.div`
  background-color: #ffffff;
  width: 95vw;
  height: auto;
  min-height: 60vh;
  margin-top: 6vh;
  margin-bottom: 6vh;
  padding: 4vh;
`;

const GroupBackgroud2 = styled.div`
  background-color: #e6e1c5;
  width: 95vw;
  height: auto;
  // min-height: 60vh;
  margin-top: 6vh;
  margin-bottom: 0vh;
  // padding: 4vh;
`;

const TagContainer = styled.div`
  display: flex;
  display-direction: row;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  padding-left: 0.25vw;
  padding-right: 0.25vw;
  margin-right: 0.25vw;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

const InfoContainer = styled.div`
  border: solid 1px #001C55;
  border-radius: 20px;
  padding: 2vh;
  width: 20vw;
  height: 100%;
`;

const btnStyle = {
  border: 'solid 2px #001C55',
  color: '#001C55',
  padding: '4px 16px',
  marginLeft: '3vw',
  marginTop: '5vh',
  backgroundColor: '#E6E1C5'
}

const btnStyle_danger = {
  border: 'solid 2px #BD0909',
  color: '#BD0909',
  padding: '4px 16px',
  marginLeft: '3vw',
  marginTop: '5vh',
  backgroundColor: '#E6E1C5'
}

const btnStyle_hidden = {
  border: 'solid 2px #001C55',
  color: '#001C55',
  padding: '4px 16px',
  marginLeft: '3vw',
  marginTop: '5vh',
  visibility: 'hidden',
  backgroundColor: '#E6E1C5'
}

const contentTextStyle = {
  color: '#001C55'
}

export default function Post({
  post
}) {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const [toDelete, setToDelete] = useState(false)

  const id2text = (type, id) => {
    if(type === 'category'){
      if(id === 1)
        return 'rec'
      else if(id === 2)
        return 'document'
      else if(id === 3)
        return 'interview'
      else if(id === 4)
        return 'test'
      else
        return 'else'
    }else{
      if(id === 1)
        return '正取'
      else if(id === 2)
        return '備取'
      else if(id === 3)
        return '未上榜'
      else if(id === 4)
        return '尚未公布'
      else
        return '不願告知'
    }
  }

  const getAuthorName = async() => {
    await instance
      .get(`/getUserById/?user_id=${post.author_id}`)
      .then((res) => {
        console.log(res);
        setAuthorName(res.data.contents.user_name);
      })
  }

  const checkEdit = () => {
    if (post.author_id === userId)
      setCanEdit(true);
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

  const handleToEdit = (post_id) => {
    console.log(post_id);
    navigate(`/edit/${post_id}`);
  }

  const handleToDelete = (post_id) => {
    console.log('to delete')
    setToDelete(true)
  }

  const handleDeletePost = async () => {
    console.log('delete this post');
    console.log(post.post_id);
    
    await instance.post(`/deletePost/?post_id=${post.post_id}`, {
      "post_id": post.post_id,
    });
    alert('刪除成功');
    setToDelete(false);
    navigate('/');
  };

  useEffect(() => {
    getAuthorName();
    checkEdit();
    getBookmark();
    getLike();
    getLikesByPostId();
    countBookmarkByPostId();
  }, [])

  return (
    <div>
      <GlobalStyle>
      <Grid
          templateColumns='repeat(12, 1fr)'
      >
        <GridItem colStart={1}>
          <Grid templateRows='repear(6, 1fr)'>
            <GridItem colStart={1}>
              <Button size='md' variant='solid' style={canEdit? btnStyle : btnStyle_hidden} onClick={() => handleToEdit(post.post_id)}>編輯文章</Button>
            </GridItem>
            <GridItem colStart={2} ml={-8}>
              <Button size='md' variant='solid' style={canEdit? btnStyle_danger : btnStyle_hidden} onClick={() => handleToDelete(post.post_id)}>刪除文章</Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Grid
            templateColumns='repeat(12, 1fr)'
            mt={-6}
      >
        <GridItem colSpan={12} justifySelf="center">
          <GroupBackgroud2>
            <Grid 
              templateColumns='repeat(24, 1fr)'
              mb={0}
            >
              {/* 第一部分：標題 + 時間 + 作者 */}
              <GridItem colStart={1} colSpan={7} ml={8}>
                <p style = {{fontSize: '52px', marginTop: '0em', fontWeight: '500', color: '#001C55'}}>{post.post_name}</p>
                <Grid 
                  templateColumns='repeat(12, 1fr)'
                  m={1}
                >
                    <GridItem colStart={1} colSpan={1} alignSelf="center">
                      <Image src={clock} alt='clock' boxSize="20px"></Image>
                    </GridItem>
                    <GridItem colStart={2} colSpan={3} alignSelf="center">
                      <p className='postInfo'>{post.post_date.split('T')[0]}</p>
                    </GridItem>
                    <GridItem colStart={6} colSpan={1} alignSelf="center">
                      <Image src={user} alt='user' boxSize="20px"></Image>
                    </GridItem>
                    <GridItem colStart={7} colSpan={5} alignSelf="center">
                      <p className='postInfo'>{authorName}</p>
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
              {/* 第三部分：錄取結果 & 聯繫作者 */}
              <GridItem colSpan={8} justifySelf="center" alignSelf="center" mt={1}>
                  <InfoContainer>
                    <p>申請年份：{post.semester}</p>
                    <p>錄取結果：{id2text('status', post.status_id)}</p>
                    <p>聯繫作者：{post.contact}</p>
                  </InfoContainer>
              </GridItem>
              {/* 第四部分：icons */}
              <GridItem colSpan={3} justifySelf="center" alignSelf="center">
                <Grid templateColumns='repeat(5, 1fr)' gap={3}>
                  <GridItem alignSelf="center">
                    <Image src={isLike? likeY:likeN} alt='like' boxSize="28px" onClick={setLike}></Image>
                  </GridItem>
                  <GridItem alignSelf="center">
                    <p className='postInfo fig' >{likeCount}</p>
                  </GridItem>
                  <GridItem colSpan={1} alignSelf="center">
                    <Image src={isBookmark? bookmarkY:bookmarkN} alt='bookmark' boxSize="28px" onClick={setBookmark}></Image>
                  </GridItem>
                  <GridItem colSpan={1} alignSelf="center">
                    <p className='postInfo fig'>{bookmarkCount}</p>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GroupBackgroud2>
        </GridItem>
      </Grid>
      <Grid
            templateColumns='repeat(12, 1fr)'
      >
        <GridItem colSpan={12} justifySelf="center">
          <GroupBackgroud>
            <p className='content_text'>{post.post_content}</p>
          </GroupBackgroud>
        </GridItem>
      </Grid>
      <AlertDialog
      isOpen={toDelete}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            刪除此貼文？
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => {setToDelete(false)}}>
              取消
            </Button>
            <Button onClick={handleDeletePost} ml={3}>
              確定刪除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
      </GlobalStyle>
    </div>
  );
}