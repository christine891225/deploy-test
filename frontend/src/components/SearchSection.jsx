import { useState, useContext } from "react";
import styled from "styled-components";
import filter from "../icons/filter.png";
import search from "../icons/search.png";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { Button, Image } from "@chakra-ui/react";
import { SearchContext } from "../routes/SearchPage";

import instance from "../axios";

const SearchSectionContainer = styled.div`
  margin: 5vh 5vw 5vh 5vw;
`;

const SearchContainer = styled.div`
  border: 1pt solid black;
  height: 6vh;
  border-radius: 10px;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input.attrs({
  placeholder: "請輸入關鍵字......",
})`
  width: 80vw;
  font-family: "Inder", sans-serif;
  &:focus {
    outline: none;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`;

const Category = styled.div`
  background-color: #f3f0e2;
  height: 6vh;
  width: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  cursor: pointer;
`;

const CategorySelect = styled.div`
  background-color: #e6e1c5;
  height: 6vh;
  width: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
`;

const Img = styled.div`
  margin-left: 1.2vw;
  margin-right: 1.2vw;
`;

export default function SearchSection({}) {
  const { category, setCategory, sort, setSort, setAllPosts } =
    useContext(SearchContext);
  const category_list = [
    "全  部",
    "推甄綜合",
    "書  審",
    "口  試",
    "筆  試",
    "其  他",
  ];
  const sort_list = ["由近到遠", "由遠到近", "按讚數", "收藏數"];
  const [searchString, setSearchString] = useState("");

  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(searchString);
      getPosts(searchString);
      setSearchString("");
    }
  };

  const getPosts = async () => {
    await instance
      .get("/searchPosts", { params: { search: searchString } })
      .then((res) => {
        console.log(res);
        setAllPosts(res.data.contents);
      });
  };

  return (
    <div>
      <SearchSectionContainer>
        <SearchContainer>
          <Img>
            <img src={search} alt="search" width="20vw" />
          </Img>
          <Input
            value={searchString}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </SearchContainer>
        <SelectContainer>
          <CategoryContainer>
            {category_list.map((category_item) =>
              category_list.indexOf(category_item) === category ? (
                <CategorySelect>{category_item}</CategorySelect>
              ) : (
                <Category
                  onClick={() =>
                    setCategory(category_list.indexOf(category_item))
                  }
                >
                  {category_item}
                </Category>
              )
            )}
            <Menu>
              <MenuButton as={Button} aria-label="Options" variant="outline">
                <Image
                  boxSize="20px"
                  objectFit="filter"
                  src={filter}
                  alt="Dan Abramov"
                />
              </MenuButton>
              <MenuList minW="0" w="10vw">
                <MenuOptionGroup
                  type="radio"
                  defaultValue={"由近到遠"}
                  onClick={(e) => setSort(sort_list.indexOf(e.target.value))}
                >
                  {sort_list.map((sort_item) =>
                    sort_list.indexOf(sort_item) === sort ? (
                      <MenuItemOption value={sort_item}>
                        {sort_item}
                      </MenuItemOption>
                    ) : (
                      <MenuItemOption
                        value={sort_item}
                        onClick={() => setSort(sort_list.indexOf(sort_item))}
                      >
                        {sort_item}
                      </MenuItemOption>
                    )
                  )}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </CategoryContainer>
        </SelectContainer>
      </SearchSectionContainer>
    </div>
  );
}
