import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIntro from '../components/LogoIntro';
import axios from 'axios';
import { UserContext } from '../App';

import { Stack } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

const PageBackground = styled.div`
  background-color: #e6e1c5;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const LogInBox = styled.div`
  background-color: #ffffff;
  width: 40vw;
  height: auto;
  border-radius: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  margin-top: -2vh;
  margin-bottom: 4vh;
`;

const inputGroupStyle = {
  marginBottom: '2vh'
}

const btnStyle = {
  padding: '4px 16px',
  marginBottom: '2vh',
  backgroundColor: '#E6E1C5' 
}

const textbtnStyle = {
  color: '#001C55',
  cursor: 'pointer'
}

const leftStyle = {
  width: '6vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

export default function LogIn() {
  const { setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logInSuccess, setLogInSuccess] = useState(false)

  const handleSignIn = () => {
    console.log('sign in')
    console.log(email, password)
  }

  const navHome = () => {
    navigate('/');
  }
  
  const navRegister = () => {
    navigate('/register');
  }
  
  const Login = async () => {
    const response = await instance.post('login/', {
      user_email: email,
      user_password: password
    });
    localStorage.clear();
    
    if (response.data.message === 'success') {
      console.log("user", response);
      setUserId(response.data.contents.user_id);
      localStorage.setItem('userId', response.data.contents.user_id);
      navigate('/');
      alert('登入成功');
    } else {
      console.log('登入失敗');
      alert(response.data.message);
    }
  }

  return (
    <div>
      <PageBackground>
        {logInSuccess ? (
          <Alert status='success'>
          <AlertIcon />
          <AlertTitle>登入成功</AlertTitle>
        </Alert>
        ):(<></>)}
        <Logo onClick={navHome} >
            <LogoIntro description={true}/>
        </Logo>
        <LogInBox>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='信箱' />
              <Input onChange={(e) => {setEmail(e.target.value)}}/>
            </InputGroup>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='密碼' />
              <Input type='password' onChange={(e) => {setPassword(e.target.value)}}/>
            </InputGroup>
            <Button size='md' variant='solid' style={btnStyle} onClick={Login}>登入</Button>
            <Stack spacing={5} direction='row'>
                <p>新朋友？</p>
                <Text onClick={navRegister} as='u' style={textbtnStyle}>
                  註冊帳號
                </Text>
            </Stack>
        </LogInBox>
      </PageBackground>
    </div>
  );
}

<>

</>