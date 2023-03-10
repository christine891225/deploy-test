import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import instance from "../axios";
import { UserContext } from "../App";
import { GlobalStyle } from "../components/globalStyle";

import { Button } from "@chakra-ui/react";
import { Stack, Grid, GridItem } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

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
  margin-top: 4vh;
  margin-bottom: 6vh;
  padding-top: 1vh;
`;

const btnStyle = {
  border: "solid 2px #001C55",
  color: "#001C55",
  padding: "4px 16px",
  marginLeft: "3vw",
  marginTop: "5vh",
  backgroundColor: "#E6E1C5",
};

const inputGroupStyle = {
  marginBottom: "3vh",
  width: "42vw",
};

const leftStyle = {
  width: "8vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const textAreaStyle_intro = {
  width: "91vw",
  marginBottom: "4vh",
  minHeight: "20vh",
  height: "auto",
  border: "solid 2px #001C55",
};

const textAreaStyle = {
  width: "91vw",
  marginBottom: "4vh",
  minHeight: "120vh",
  height: "auto",
  border: "solid 2px #001C55",
};

const hStyle = {
  color: "#001C55",
  marginBottom: "1vh",
  fontWeight: "900",
};

export default function SharePost({}) {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("rec"); // 1:????????????, 2:??????, 3:??????, 4:??????, 5:??????
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("pos-take"); // 1:??????, 2:??????, 3:?????????, 4:????????????, 5:????????????
  const [contactContent, setContactContent] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [year, setYear] = useState(-1);

  const [toShare, setToShare] = useState(false);
  const [toLeave, setToLeave] = useState(false);

  const [titleLong, setTitleLong] = useState(false);
  const [introLong, setIntroLong] = useState(false);

  useEffect(() => {
    if (title.length > 9) setTitleLong(true);
    else setTitleLong(false);
    if (intro.length > 80) setIntroLong(true);
    else setIntroLong(false);
  }, [title, intro]);

  const text2id = (type, text) => {
    if (type === "category") {
      if (text === "rec") return 1;
      else if (text === "document") return 2;
      else if (text === "interview") return 3;
      else if (text === "test") return 4;
      else return 5;
    } else {
      if (text === "pos-take") return 1;
      else if (text === "reserve") return 2;
      else if (text === "neg-take") return 3;
      else if (text === "unknown") return 4;
      else return 5;
    }
  };

  const handleToShare = () => {
    setToShare(true);
  };

  const createPost = async () => {
    console.log(
      title,
      category,
      tags,
      status,
      contactContent,
      intro,
      content,
      year
    );
    let split_tags;
    if (tags === "") {
      split_tags = [];
    } else {
      split_tags = tags.split(",");
    }

    const res = await instance.post("createPost/", {
      post_name: title,
      post_date: Date.now(),
      post_intro: intro,
      post_content: content,
      author_id: userId,
      semester: year, //
      category_id: text2id("category", category),
      status_id: text2id("status", status),
      views: 0,
      bookmarks: 0,
      likes: 0,
      comments: 0,
      tags: split_tags,
      contact: contactContent,
    });
    if (res.data.message === "success") {
      alert("?????????");
      navigate("/");
    } else if (res.data.message === "?????????????????????") {
      setToShare(false)
      alert("?????????????????????");
    } else {
      alert("????????????");
    }
  };

  return (
    <div>
      <GlobalStyle>
        <PageBackground>
          <NavBar />
          {titleLong ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>??????????????????</AlertTitle>
              <AlertDescription>???????????????????????????9</AlertDescription>
            </Alert>
          ) : (
            <></>
          )}
          {introLong ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>??????????????????</AlertTitle>
              <AlertDescription>?????????????????????????????????80</AlertDescription>
            </Alert>
          ) : (
            <></>
          )}
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colStart={1}>
              <Button
                size="md"
                variant="solid"
                style={btnStyle}
                onClick={handleToShare}
                disabled={titleLong || introLong}
              >
                ????????????
              </Button>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={12} justifySelf="center">
              <GroupBackgroud>
                <Grid templateColumns="repeat(10, 1fr)" m={6} mb={1} mt={4}>
                  <GridItem colStart={1}>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">??????</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>??????????????????9?????????
                    </p>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">??????</p>
                      </InputLeftAddon>
                      <RadioGroup defaultValue="rec">
                        <Stack
                          spacing={[1, 11]}
                          direction={["column", "row"]}
                          marginLeft="2vw"
                          marginTop="1vh"
                        >
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="rec"
                          >
                            ????????????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="document"
                          >
                            ??????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="interview"
                          >
                            ??????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="test"
                          >
                            ??????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="else"
                          >
                            ??????
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </InputGroup>
                    <p
                      className="hint hidden"
                      style={{
                        marginTop: "-2vh",
                        marginBottom: "2vh",
                        visibility: "hidden",
                      }}
                    >
                      .<span style={{ color: "red" }}></span>
                    </p>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">??????</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setTags(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>
                      ???????????????????????????????????????
                    </p>
                  </GridItem>
                  <GridItem colStart={6}>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">????????????</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setYear(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>????????????????????????
                      ??????112???110
                    </p>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">????????????</p>
                      </InputLeftAddon>
                      <RadioGroup defaultValue="pos-take">
                        <Stack
                          spacing={[1, 11]}
                          direction={["column", "row"]}
                          marginLeft="2vw"
                          marginTop="1vh"
                        >
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="pos-take"
                          >
                            ??????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="reserve"
                          >
                            ??????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="neg-take"
                          >
                            ?????????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="unknown"
                          >
                            ????????????
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="hidden"
                          >
                            ????????????
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </InputGroup>
                    <p className="hint hidden">
                      .<span style={{ color: "red" }}></span>
                    </p>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">????????????</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setContactContent(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>
                      ????????????email???????????????????????????????????????????????????????????????
                    </p>
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem colSpan={12} justifySelf="center">
                    <p style={hStyle}>????????????</p>
                    <Textarea
                      onChange={(e) => {
                        setIntro(e.target.value);
                      }}
                      placeholder="??????????????????"
                      style={textAreaStyle_intro}
                    />
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>
                      ??????????????????80?????????
                    </p>
                    <p style={hStyle}>????????????</p>
                    <Textarea
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      placeholder="??????????????????"
                      style={textAreaStyle}
                    />
                  </GridItem>
                </Grid>
              </GroupBackgroud>
            </GridItem>
          </Grid>
        </PageBackground>
        <AlertDialog isOpen={toShare}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                ??????????????????
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={() => {
                    setToShare(false);
                  }}
                >
                  ??????
                </Button>
                <Button onClick={createPost} ml={3}>
                  ????????????
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <AlertDialog isOpen={toLeave}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                ????????????????????????????????????????????????????????????
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={() => {
                    setToLeave(false);
                  }}
                >
                  ??????
                </Button>
                <Button ml={3}>??????</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </GlobalStyle>
    </div>
  );
}
