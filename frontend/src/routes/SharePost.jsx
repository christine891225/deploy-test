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
  const [category, setCategory] = useState("rec"); // 1:推甄綜合, 2:書審, 3:口試, 4:筆試, 5:其他
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("pos-take"); // 1:正取, 2:備取, 3:未上榜, 4:尚未公告, 5:不願公開
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
      alert("已發布");
      navigate("/");
    } else if (res.data.message === "內容未填寫完整") {
      setToShare(false)
      alert("內容未填寫完整");
    } else {
      alert("發佈失敗");
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
              <AlertTitle>資料輸入錯誤</AlertTitle>
              <AlertDescription>標題字元數請勿超過9</AlertDescription>
            </Alert>
          ) : (
            <></>
          )}
          {introLong ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>資料輸入錯誤</AlertTitle>
              <AlertDescription>文章簡介字元數請勿超過80</AlertDescription>
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
                發布貼文
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
                        <p className="text">標題</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>請勿填寫超過9個字元
                    </p>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">分類</p>
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
                            推甄綜合
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="document"
                          >
                            書審
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="interview"
                          >
                            口試
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="test"
                          >
                            筆試
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            colorScheme="blue"
                            value="else"
                          >
                            其他
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
                        <p className="text">標籤</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setTags(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>
                      請在每個標籤之間用逗號隔開
                    </p>
                  </GridItem>
                  <GridItem colStart={6}>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">申請學年</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setYear(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>請填入阿拉伯數字
                      如：112、110
                    </p>
                    <InputGroup style={inputGroupStyle}>
                      <InputLeftAddon
                        style={leftStyle}
                        backgroundColor="#001C55"
                        color="white"
                      >
                        <p className="text">錄取結果</p>
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
                            正取
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="reserve"
                          >
                            備取
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="neg-take"
                          >
                            未上榜
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="unknown"
                          >
                            尚未公布
                          </Radio>
                          <Radio
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                            colorScheme="blue"
                            value="hidden"
                          >
                            不願公開
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
                        <p className="text">聯繫作者</p>
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => {
                          setContactContent(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>
                      留下個人email等資訊讓其他人找到你是誰，若不願透漏可留空
                    </p>
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem colSpan={12} justifySelf="center">
                    <p style={hStyle}>文章簡介</p>
                    <Textarea
                      onChange={(e) => {
                        setIntro(e.target.value);
                      }}
                      placeholder="輸入文章簡介"
                      style={textAreaStyle_intro}
                    />
                    <p className="hint">
                      <span style={{ color: "red" }}>*</span>
                      請勿填寫超過80個字元
                    </p>
                    <p style={hStyle}>文章內容</p>
                    <Textarea
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      placeholder="輸入文章內容"
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
                發布新貼文？
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={() => {
                    setToShare(false);
                  }}
                >
                  取消
                </Button>
                <Button onClick={createPost} ml={3}>
                  確定發布
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <AlertDialog isOpen={toLeave}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                離開此網頁？您填寫的文章內容將不會被保存
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={() => {
                    setToLeave(false);
                  }}
                >
                  取消
                </Button>
                <Button ml={3}>離開</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </GlobalStyle>
    </div>
  );
}
