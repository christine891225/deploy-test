import styled from "styled-components";

export const GlobalStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inder&display=swap");

  // LogoInfo "NTUIMaster"
  & h1 {
    font-family: 'Inder', sans-serif;
    font-size: 5em;
    color: #001c55;
  }

  // NavBar "NTUIMaster"
  & h2 {
    font-family: 'Inder', sans-serif;
    font-size: 2em;
    color: #e6e1c5;
  }

  // GroupHeader groupName, GroupPost post_name
  & h3 {
    font-family: 'Inder', sans-serif;
    font-size: 2em;
    font-weight: bold;
    color: #000000;
  }

  // LogoInfo description
  & p {
    font-family: 'Inder', sans-serif;
  }

  // GroupPost tag_name
  .cardTags {
    font-family: 'Inder', sans-serif;
    font-size: 0.3em;
  }

  // GroupPost card info (time, user)
  .cardInfo {
    font-family: 'Inder', sans-serif;
    // font-size: 0.3em;
    font-size: 15px;
  }

  // SearchCard
  .searchCardInfo {
    font-size: 0.8em;
  }
  .searchCardInfo.fig {
    font-size: 1em;
  }

  // PersonalInfo email
  .email {
    font-family: 'Inder', sans-serif;
    font-size: 1.5em;
    color: #001c55;
  }

  // NavBar button
  .button {
    font-family: 'Inder', sans-serif;
    font-size: 1em;
    font-weight: bold;
    color: #001c55;
  }

  // PersonalInfo Name
  .name {
    font-family: 'Inder', sans-serif;
    font-size: 4em;
    color: #001c55;
  }

  // SharePost
  .hint {
    margin-top: -2vh; 
    margin-bottom: 2vh; 
  }

  .hint.hidden {
    visibility: hidden;
  }

  // Group
  .no_content {
    color: #001C55;
    font-weight: 500;
    font-size: 24px;
    margin-top: 10vh;
    margin-bottom: 4vh;
  }

  // Register
  .hint.r {
    margin-top: -1vh;
    align-self: start;
  }

  // Post
  .content_text {
    font-size: 20px;
  }

  .postInfo {
    font-family: 'Inder', sans-serif;
    font-size: 16px;
  }
  .postInfo.fig {
    font-size: 20px;
  }

  .cardTags {
    font-size: 14px;
  }
`;