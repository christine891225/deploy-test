import styled from 'styled-components';
import React from 'react';
import Group from '../components/Group';
import NavBar from '../components/NavBar';
import PersonalInfo from '../components/PersonalInfo';

import { SimpleGrid } from '@chakra-ui/react'

const PageBackground = styled.div`
  background-color: #e6e1c5;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GroupBackgroud = styled.div`
  background-color: #ffffff;
  width: 95vw;
  margin-bottom: 2vh;
`;


export default function PersonalPage({

}) {
  return (
    <div>
      <PageBackground>
        <NavBar />
        <PersonalInfo />
        <GroupBackgroud className='Home'>
          <SimpleGrid rows={2} direction='column'>
            <Group groupName="收藏文章" type={'收藏'} action={'尋找喜愛的貼文'}/>
            <Group groupName="已發佈文章" type={'已發布'} action={'發布你的第一篇文'}/>
          </SimpleGrid>
        </GroupBackgroud>
      </PageBackground>
    </div>
  );
}