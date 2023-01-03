import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './routes/Home';
import PersonalPage from './routes/PersonalPage';
import Register from './routes/Register';
import LogIn from './routes/LogIn';
import SearchPage from './routes/SearchPage';
import SharePost from './routes/SharePost';
import PostPage from './routes/PostPage';
import EditPostPage from './routes/EditPostPage';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

export const UserContext = React.createContext();

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [bookmarkPostCount, setBookmarkPostCount] = useState(0);
  const [likePostCount, setLikePostCount] = useState(0);

  return (
    <>
      <ChakraProvider>
        <UserContext.Provider value={{ userId, setUserId, bookmarkPostCount, setBookmarkPostCount, likePostCount, setLikePostCount }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/user" element={<PersonalPage />} />
              <Route exact path="/login" element={<LogIn />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/search" element={<SearchPage />} />
              <Route exact path="/share" element={<SharePost />} />
              <Route exact path="/post/:id" element={<PostPage />} />
              <Route exact path="/edit/:id" element={<EditPostPage />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
    </ChakraProvider>
    </>
  );
}

export default App;
