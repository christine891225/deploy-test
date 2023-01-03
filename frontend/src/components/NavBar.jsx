import styled from 'styled-components';
import { GlobalStyle } from './globalStyle';
import user from '../icons/user.png';
import logo from '../icons/mortarboard(1).png';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const NavBackground = styled.div`
  background-color: #001c55;
  width: 100vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 1vw;
  padding-left: 1vw;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.div`
  padding-left: 0.5vw;
`;

const Functions = styled.div`
  display: flex;
  display-direction: row;
`;

const Button = styled.div`
  background-color: #e6e1c5;
  border-radius: 10px;
  padding: 0.25vw 0.5vw 0.25vw 0.5vw;
  margin-right: 1.5vw;
  cursor: pointer;
  align-self: center;
`;

const UserBackground = styled.div`
  background-color: #e6e1c5;
  border-radius: 50%;
  width: 4vh;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  cursor: pointer;
`;

export default function NavBar({

}) {
  const { userId, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const navHome = () => {
    navigate('/');
  }

  const navSharePost = () => {
    navigate('/share');
  }

  const navSearch = () => {
    navigate('/search');
  }

  const navPersonal = () => {
    navigate('/user');
  }

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    if (!userId)
      navigate('/login');
  }, [userId])

  return (
    <div>
      <GlobalStyle>
      <NavBackground>
        <Logo onClick={navHome} >
          <h2>NTUIMaster</h2>
          <Img><img src={logo} alt='mortarboard' width='30vw'/></Img>
        </Logo>
        <Functions>
          <Button><p className='button' onClick={navSharePost}>我 要 分 享</p></Button>
          <Button><p className='button' onClick={navSearch}>我 要 找 經 驗</p></Button>
          <UserBackground onClick={navPersonal}>
            <img src={user} alt='user' width='20vw'/>
          </UserBackground>
        </Functions>
      </NavBackground>
      </GlobalStyle>
    </div>
  );
}