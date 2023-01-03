import styled from 'styled-components';
import { GlobalStyle } from './globalStyle';

import logo from '../icons/mortarboard.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 70vw;
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 70vw;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;


export default function LogoIntro({
  description,
}) {
  return (
    <GlobalStyle>
      <Container>
        <LogoContainer>
          <h1>NTUIMaster</h1>
          <img src={logo} alt='mortarboard' width='90vw'/>
        </LogoContainer>
        {description ? (
          <Intro>
            <p style={{fontWeight: '500', color: '#001C55'}}>這是一個關於台大資管所申請的資訊分享平台，主要提供「經驗查找」以及「經驗分享」兩大功能。</p>
            <p style={{fontWeight: '500', color: '#001C55'}}>無論是想要多聽聽學長姐的建議、尋找信賴可靠的準備方式，抑或是想將資源、經驗做有效且系統性的傳遞，這個平台都是你的first pick! 讓IM大家庭的溫暖與那些珍貴、無可取代的故事做最好的傳承。</p>
          </Intro>
        ): (<></>)}
      </Container>
    </GlobalStyle>
  );
}
