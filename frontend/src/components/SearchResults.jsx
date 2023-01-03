import styled from 'styled-components';
import SearchCard from './SearchCard';
import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../routes/SearchPage';
import { GlobalStyle } from './globalStyle';
import sad from '../icons/sad.png';

import { SimpleGrid, Grid } from '@chakra-ui/react'
import { Center} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

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
  const { category, setCategory, sort, setSort, allPosts, setAllPosts } = useContext(SearchContext);
  const [posts, setPosts] = useState([]);

  function sort0(a, b) {
    let dateA = new Date(a.post_date.replace('T', ' ').replace(/-/g,'/'));
    let dateB = new Date(b.post_date.replace('T', ' ').replace(/-/g,'/'));
    if (dateA < dateB) {
      return -1;
    } else if (dateB < dateA) {
      return 1;
    } else { 
      return 0; }
  };

  function sort1(a, b) {
    let dateA = new Date(a.post_date.replace('T', ' ').replace(/-/g,'/'));
    let dateB = new Date(b.post_date.replace('T', ' ').replace(/-/g,'/'));
    console.log(dateA, dateB);
    if (dateA < dateB) {
      return 1;
    } else if (dateB < dateA) {
      return -1;
    } else { return 0; }
  };

  function sort2(a, b) {
    let likeA = a.likes;
    let likeB = b.likes;
    if (likeA < likeB) {
      return -1;
    } else if (likeB < likeA) {
      return 1;
    } else { return 0; }
  };

  function sort3(a, b) {
    let bookmarkA = a.bookmarks;
    let bookmarkB = b.bookmarks;
    if (bookmarkA < bookmarkB) {
      return -1;
    } else if (bookmarkB < bookmarkA) {
      return 1;
    } else { return 0; }
  };

  const filterSortPosts = () => {
    let filterSortPosts = allPosts;

    if (category !== 0) {
      filterSortPosts = filterSortPosts.filter((item) => item.category_id === category);
    }

    if (sort === 0) { // 由近到遠
      console.log("由近到遠");
      filterSortPosts = filterSortPosts.sort(sort0);
    } else if (sort === 1) { // 由遠到近
      console.log("由遠到近");
      filterSortPosts = filterSortPosts.sort(sort1);
    } else if (sort === 2) { // 按讚數
      console.log("按讚數");
      filterSortPosts = filterSortPosts.sort(sort2);
    } else if (sort === 3) { // 收藏數
      console.log("收藏數");
      filterSortPosts = filterSortPosts.sort(sort3);
    }

    setPosts(filterSortPosts);
  }

  const getAllPosts = async () => {
    try {
        const response = await instance.get('/getPosts');
        console.log(response);
        setAllPosts(response.data.contents);
        setPosts(response.data.contents);
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (allPosts !== [])
      getAllPosts();
      setCategory(0);
      setSort(0);
  }, [])

  useEffect(() => {
    filterSortPosts();
  }, [allPosts, category, sort])

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
        posts.length === 0 ? (
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
              posts.map((post) => (
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
