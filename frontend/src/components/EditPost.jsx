import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalStyle } from '../components/globalStyle';

import { Button} from '@chakra-ui/react'
import { Stack, Grid, GridItem } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

const GroupBackgroud = styled.div`
  background-color: #ffffff;
  width: 95vw;
  margin-top: 4vh;
  margin-bottom: 4vh;
  padding-top: 1vh;
`;

const btnStyle = {
  border: 'solid 2px #001C55',
  color: '#001C55',
  padding: '4px 16px',
  marginLeft: '3vw',
  marginTop: '5vh',
  backgroundColor: '#E6E1C5'
}

const inputGroupStyle = {
  marginBottom: '3vh',
  width: '42vw'
}

const leftStyle = {
  width: '8vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

const textStyle = {
  
}

const textAreaStyle_intro = {
  width: '91vw',
  marginBottom: '4vh',
  minHeight: '20vh',
  height: 'auto',
  border: 'solid 2px #001C55',
}

const textAreaStyle = {
  width: '91vw',
  marginBottom: '4vh',
  minHeight: '120vh',
  height: 'auto',
  border: 'solid 2px #001C55',
}

const hStyle = {
  color: '#001C55',
  marginBottom: '1vh',
  fontWeight: '900'
}

export default function EditPost({
  post
}) {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('') // 1:推甄綜合, 2:書審, 3:口試, 4:筆試, 5:其他
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState('') // 1:正取, 2:備取, 3:未上榜, 4:尚未公告, 5:不願公開
  const [contactContent, setContactContent] = useState('')
  const [intro, setIntro] = useState('')
  const [content, setContent] = useState('')
  const [year, setYear] = useState()
  
  const [toEdit, setToEdit] = useState(false)

  const [titleLong, setTitleLong] = useState(false)
  const [introLong, setIntroLong] = useState(false)

  useEffect(() => {
    setTitle(post.post_name);
    setCategory(post.category_id);
    setTags(post.tags);
    setStatus(post.status_id);
    setContactContent(post.contact);
    setIntro(post.post_intro);
    setContent(post.post_content);
    setYear(post.semester);
  }, [])

  useEffect(() => {
    if(title.length > 9)
      setTitleLong(true) 
    else
      setTitleLong(false)
    if(intro.length > 80)
      setIntroLong(true)
    else
      setIntroLong(false)
  }, [title, intro]);

  const text2id = (type, text) => {
    if(type === 'category'){
      if(text === 'rec') return 1
      else if(text === 'document') return 2
      else if(text === 'interview') return 3
      else if(text === 'test') return 4
      else return 5
    }else{
      if(text === 'pos-take') return 1
      else if(text === 'reserve') return 2
      else if(text === 'neg-take') return 3
      else if(text === 'unknown') return 4
      else return 5
    }
  }

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
        return 'pos-take'
      else if(id === 2)
        return 'reserve'
      else if(id === 3)
        return 'neg-take'
      else if(id === 4)
        return 'unknown'
      else
        return 'hidden'
    }
  };

  const handleToEdit = () => {
    setToEdit(true)
  };

  const handleEditPost = async () => {
    console.log('edit this post');
    console.log(post.post_id);
    console.log(title, category, tags, status, contactContent, year,content)
    let split_tags = tags.toString();
    if (tags === '') {
      split_tags = [];
    }else{
      split_tags = split_tags.split(',');
    }

    await instance.post(`/updatePost/?post_id=${post.post_id}`, {
      "post_id": post.post_id,
      "post_name": title,
      "post_intro": intro,
      "post_content": content,
      "semester": year, 
      "category_id": text2id('category', category),
      "status_id": text2id('status', status),
      "tags": split_tags,
      "contact": contactContent
    });
    alert('編輯成功');
    setToEdit(false);
    navigate(`/post/${post.post_id}`);
  };


  return (
    <div>
      <GlobalStyle>
      {titleLong ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>資料輸入錯誤</AlertTitle>
            <AlertDescription>標題字元數請勿超過9</AlertDescription>
          </Alert>):(<></>)
        }
        {introLong ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>資料輸入錯誤</AlertTitle>
            <AlertDescription>文章簡介字元數請勿超過80</AlertDescription>
          </Alert>):(<></>)
        }
      <Grid
          templateColumns='repeat(12, 1fr)'
      >
        <GridItem colStart={1}>
          <Button size='md' variant='solid' style={btnStyle} onClick={handleToEdit} disabled={titleLong || introLong}>完成編輯</Button>
        </GridItem>
      </Grid>
      <Grid
          templateColumns='repeat(12, 1fr)'
      >
        <GridItem colSpan={12} justifySelf="center">
          <GroupBackgroud>
            <Grid
              templateColumns='repeat(10, 1fr)'
              m={6}
              mb={1}
              mt={4}
            >
              <GridItem colStart={1}>
                <InputGroup style = {inputGroupStyle}>
                  <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white'>
                    <p style={textStyle}>標題</p>
                  </InputLeftAddon>
                  <Input onChange={(e) => {setTitle(e.target.value)}} defaultValue={title}/>
                </InputGroup>
                <p className='hint'><span style={{color: 'red'}}>*</span>請勿填寫超過9個字元</p>
                <InputGroup style = {inputGroupStyle}>
                  <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white'>
                    <p style={textStyle}>分類</p>
                  </InputLeftAddon>
                  <RadioGroup defaultValue={id2text('category', category)}>
                    <Stack spacing={[1,11]} direction={['column', 'row']} marginLeft='2vw' marginTop='1vh'>
                      <Radio onChange={(e) => {setCategory(e.target.value)}} colorScheme='blue' value='rec'>推甄綜合</Radio>
                      <Radio onChange={(e) => {setCategory(e.target.value)}} colorScheme='blue' value='document'>書審</Radio>
                      <Radio onChange={(e) => {setCategory(e.target.value)}} colorScheme='blue' value='interview'>口試</Radio>
                      <Radio onChange={(e) => {setCategory(e.target.value)}} colorScheme='blue' value='test'>筆試</Radio>
                      <Radio onChange={(e) => {setCategory(e.target.value)}} colorScheme='blue' value='else'>其他</Radio>
                    </Stack>
                  </RadioGroup>
                </InputGroup>
                <p  className='hint hidden'>.<span style={{color: 'red'}}></span></p>
                <InputGroup style = {inputGroupStyle}>
                  <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white'>
                    <p style={textStyle}>標籤</p>
                  </InputLeftAddon>
                  <Input onChange={(e) => {setTags(e.target.value)}} defaultValue={tags}/>
                </InputGroup>
                <p className='hint'><span style={{color: 'red'}}>*</span>請在每個標籤之間用逗號隔開</p>
              </GridItem>
              <GridItem colStart={6}>
              <InputGroup style = {inputGroupStyle}>
                  <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white'>
                    <p className='text'>申請學年</p>
                  </InputLeftAddon>
                  <Input onChange={(e) => {setYear(e.target.value)}} defaultValue={year}/>
                </InputGroup>
                <p  className='hint'><span style={{color: 'red'}}>*</span>請填入阿拉伯數字 如：112、110</p>
              <InputGroup style = {inputGroupStyle}>
                  <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white'>
                    <p style={textStyle}>錄取結果</p>
                  </InputLeftAddon>
                  <RadioGroup  defaultValue={id2text('status', status)}>
                    <Stack spacing={[1,11]} direction={['column', 'row']} marginLeft='2vw' marginTop='1vh'>
                      <Radio onChange={(e) => {setStatus(e.target.value)}} colorScheme='blue' value='pos-take'>正取</Radio>
                      <Radio onChange={(e) => {setStatus(e.target.value)}} colorScheme='blue' value='reserve'>備取</Radio>
                      <Radio onChange={(e) => {setStatus(e.target.value)}} colorScheme='blue' value='neg-take'>未上榜</Radio>
                      <Radio onChange={(e) => {setStatus(e.target.value)}} colorScheme='blue' value='unknown'>尚未公布</Radio>
                      <Radio onChange={(e) => {setStatus(e.target.value)}} colorScheme='blue' value='hidden'>不願公開</Radio>
                    </Stack>
                  </RadioGroup>
                </InputGroup>
                <p  className='hint hidden'>.<span style={{color: 'red'}}></span></p>
                <InputGroup style = {inputGroupStyle}>
                  <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white'>
                    <p style={textStyle}>聯繫作者</p>
                  </InputLeftAddon>
                  <Input onChange={(e) => {setContactContent(e.target.value)}} defaultValue={contactContent}/>
                </InputGroup>
                <p className='hint'><span style={{color: 'red'}}>*</span>留下個人email等資訊讓其他人找到你是誰，若不願透漏請填「無」</p>
              </GridItem>
            </Grid>
            <Grid
              templateColumns='repeat(12, 1fr)'
            >
              <GridItem colSpan={12} justifySelf="center">
                <p style={hStyle}>文章簡介</p>
                <Textarea onChange={(e) => {setIntro(e.target.value)}} placeholder='輸入文章內容' style={textAreaStyle_intro} defaultValue={intro}/>
                <p style={hStyle}>文章內容</p>
                <Textarea onChange={(e) => {setContent(e.target.value)}} placeholder='輸入文章內容' style={textAreaStyle} defaultValue={content}/>
              </GridItem>
            </Grid>  
          </GroupBackgroud>
        </GridItem>
      </Grid>
    <AlertDialog
      isOpen={toEdit}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            編輯此貼文？
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => {setToEdit(false)}}>
              取消
            </Button>
            <Button onClick={handleEditPost} ml={3}>
              確定編輯
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </GlobalStyle>
    </div>
  );
}