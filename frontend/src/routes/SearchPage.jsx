import styled from 'styled-components';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SearchSection from '../components/SearchSection';
import SearchResult from '../components/SearchResults';

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
  height: auto;
  margin-top: 6vh;
  margin-bottom: 6vh;
  padding-bottom: 6vh;
`;

export const SearchContext = React.createContext();

export default function SearchPage({

}) {
  
  const [category, setCategory] = useState(0)
  const [sortItem, setSortItem] = useState(0);
  const [allPosts, setAllPosts] = useState([]);

  return (
    <div>
      <PageBackground>
        <NavBar />
        <GroupBackgroud>
          <SimpleGrid rows={2} direction='column'>
            <SearchContext.Provider value={{category, setCategory, sortItem, setSortItem, allPosts, setAllPosts }}>
              <SearchSection />
              <SearchResult />
            </SearchContext.Provider>
          </SimpleGrid>
        </GroupBackgroud>
      </PageBackground>
    </div>
  );
}