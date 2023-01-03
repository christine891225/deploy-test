import styled from 'styled-components';
import SearchCard from './SearchCard';
import { useContext } from 'react';
import { SearchContext } from '../routes/SearchPage';
import { GlobalStyle } from './globalStyle';
import sad from '../icons/sad.png';

import { SimpleGrid, Grid } from '@chakra-ui/react'
import { Center} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

const SearchCardContainer = styled.div`
  display: flex;
  display-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 5vw;
  margin-right: 5vw;
  min-height: 50vh;
`;

export default function SearchResult({

}) {
  const { allPosts } = useContext(SearchContext);

  return (
    <div>
      <GlobalStyle>
      <SearchCardContainer>
      { allPosts.length === 0 ? (
        <Grid>
          <Center color='001C55'>
            <p className='no_content'>沒有搜尋結果 請嘗試搜尋別的關鍵字</p>
          </Center>
          <Center h='100px' color='001C55'>
            <Image src={sad} alt='sad' id="sad" boxSize="100px"></Image>
          </Center>
        </Grid>
      ): (
        allPosts.length === 0 ? (
          <Grid>
            <Center color='001C55'>
              <p className='no_content'>此分類沒有搜尋結果 請嘗試尋找別的分類</p>
            </Center>
            <Center h='100px' color='001C55'>
            <Image src={sad} alt='sad' id="sad" boxSize="100px"></Image>
          </Center>
          </Grid>
        ):(
          <SimpleGrid columns={2} spacing={4}>
            {
              allPosts.map((post) => (
                <SearchCard post={post} />
              ))
            }
          </SimpleGrid>
        )
      )}
      </SearchCardContainer>
      </GlobalStyle>
    </div>
  )
}
