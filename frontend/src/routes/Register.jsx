import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIntro from '../components/LogoIntro';
import instance from "../axios";
import { GlobalStyle } from '../components/globalStyle';

import { Stack } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [isNTUIM, setIsNTUIM] = useState(true)
  const [valid, setValid] = useState(true)
  const [clickable, setClickable] = useState(false)

  useEffect(() => {
    if(name.length > 8) 
      setValid(false) 
    else
      setValid(true)
  }, [name]);

  useEffect(() => {
    if((name === "") || email === "" || password === "" || password2 === "" )
      setClickable(false) 
    else
      setClickable(true)
  }, [name, email, password, password2]);

  const navLogIn = () => {
    navigate('/login');
  }

  const createUser = async () => {
    if(password !== password2) {
      alert('???????????????');
      return;
    }
    const res = await instance.post("createUser/", 
      {
        user_name: name,
        user_email: email,
        user_password: password,
        is_ntuim: isNTUIM,
      })
    if (res.data.message === '????????????') {
      if(isNTUIM === 'no'){
        alert('????????????? ?????????????????????????????????????????????????????????????????????!????????????????????????????????????');
        navigate('/login');
      }else{
        alert('????????????'); 
        navigate('/login'); 
      }
    } else if (res.data.message === '???????????????') {
      alert('?????????');
      navigate('/login');
    } else {
      alert('????????????');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if(!clickable) {
        alert('?????????????????????');
      } else {
        createUser();
      }
    }
  };

  return (
    <div>
      <GlobalStyle>
      <PageBackground>
        {valid ? (<></>):(
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>??????????????????</AlertTitle>
            <AlertDescription>???????????????????????????8</AlertDescription>
          </Alert>
        )}
        <Logo>
            <LogoIntro description={true}/>
        </Logo>
        <LogInBox>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='??????' />
              <Input onKeyDown={handleKeyDown} onChange={(e) => {setName(e.target.value)}}/>
            </InputGroup>
            <p className='hint r'><span style={{color: 'red'}}>*</span>??????????????????8?????????</p>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='??????' />
              <Input onKeyDown={handleKeyDown} onChange={(e) => {setEmail(e.target.value)}}/>
            </InputGroup>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='??????' />
              <Input onKeyDown={handleKeyDown} type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </InputGroup>
            <InputGroup style = {inputGroupStyle}>
              <InputLeftAddon style={leftStyle} backgroundColor='#001C55' color='white' children='????????????' />
              <Input onKeyDown={handleKeyDown} type="password" onChange={(e) => {setPassword2(e.target.value)}}/>
            </InputGroup>
            <RadioGroup style = {inputGroupStyle} defaultValue='yes'>
              <Stack spacing={5} direction='row'>
                <p>?????????????????????????????????</p>
                <Radio onChange={(e) => {setIsNTUIM(e.target.value)}} colorScheme='green' value='yes'>
                  ???
                </Radio>
                <Radio onChange={(e) => {setIsNTUIM(e.target.value)}} colorScheme='red' value='no'>
                  ???
                </Radio>
              </Stack>
            </RadioGroup>
            <Button size='md' variant='solid' style={btnStyle} onClick={createUser} disabled={!clickable || !valid} >??????</Button>
            <Stack spacing={5} direction='row'>
                <p>??????????????????</p>
                <Text onClick={navLogIn} as='u' style={textbtnStyle}>
                  ??????
                </Text>
            </Stack>
        </LogInBox>
      </PageBackground>
      </GlobalStyle>
    </div>
  );
}

<>

</>