import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIntro from '../components/LogoIntro';
import instance from "../axios";
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
  const [clickable, setClickable] = useState(false)
  
  const navRegister = () => {
    navigate('/register');
  }
  
  useEffect(() => {
    if( email === "" || password === "" )
      setClickable(false) 
    else
      setClickable(true)
  }, [email, password]);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if(!clickable) {
        alert('請輸入信箱與密碼');
      } else {
        Login();
      }
    }
  };

  return (
    <div>
      <PageBackground>
        {logInSuccess ? (
          <Alert status='success'>
          <AlertIcon />
          <AlertTitle>登入成功</AlertTitle>
        </Alert>
        ):(<></>)}
        <Logo>
            <LogoIntro description={true}/>
        </Logo>
        <LogInBox>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='信箱' />
              <Input onKeyDown={handleKeyDown} onChange={(e) => {setEmail(e.target.value)}}/>
            </InputGroup>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='密碼' />
              <Input onKeyDown={handleKeyDown} type='password' onChange={(e) => {setPassword(e.target.value)}}/>
            </InputGroup>
            <Button size='md' variant='solid' style={btnStyle} onClick={Login} disabled={!clickable}>登入</Button>
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