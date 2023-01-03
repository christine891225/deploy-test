import styled from 'styled-components';
import { useContext } from 'react';
import Group from '../components/Group';
import LogoIntro from '../components/LogoIntro';
import NavBar from '../components/NavBar';
import { UserContext } from '../App';

import { SimpleGrid } from '@chakra-ui/react'

const PageBackground = styled.div`
  background-color: #e6e1c5;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GroupBackgroud = styled.div`
  background-color: #ffffff;
  width: 95vw;
  margin-bottom: 4vh;
`;

export default function Home({

}) {
  const { userId } = useContext(UserContext);

  return (
    <div>
      <PageBackground>
        <NavBar />
        <LogoIntro description={true}/>
        <GroupBackgroud className='Home'>
          <SimpleGrid rows={2} direction='column'>
            <Group groupName="最新文章" userId={userId}/>
            <Group groupName="熱門文章" userId={userId}/>
          </SimpleGrid>
        </GroupBackgroud>
      </PageBackground>
    </div>
  );
}
