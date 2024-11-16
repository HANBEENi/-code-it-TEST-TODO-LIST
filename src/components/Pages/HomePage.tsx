import { styled } from "styled-components";
import {
  Character1ImageSVG,
  Character3ImageSVG,
  DoneImageSVG,
  SearchImageSVG,
  TodoImageSVG,
} from "../../../public/svgs/ImageSVG";
import {
  AddGrayButtonSVG,
  AddTextGrayButtonSVG,
} from "../../../public/svgs/ButtonSVG";
import TodoList_R from "../Reusable/TodoList_R";
import { media } from "@/styles/mediaQuery";
import { useEffect, useState } from "react";

const HomePageComponent = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTodoNone, setIsTodoNone] = useState<boolean>(true);
  const [isDoneNone, setIsDoneNone] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 744); // 모바일 기준
    };

    handleResize(); // 초기화
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // 이벤트 클린업
  }, []);

  return (
    <>
      <SearchWrap>
        <Search>
          <input type="text" placeholder="할 일을 입력해주세요." />
        </Search>
        <AddButton>
          {isMobile ? <AddGrayButtonSVG /> : <AddTextGrayButtonSVG />}
        </AddButton>
      </SearchWrap>
      <ContentWrap>
        <List className="todo">
          <div className="title">
            <TodoImageSVG />
          </div>
          <div className="list">
            {isTodoNone ? (
              <div className="noneImage">
                <Character1ImageSVG />
                <div className="text">
                  할 일이 없어요.
                  <br />
                  TODO를 새롭게 추가해주세요!
                </div>
              </div>
            ) : (
              <>
                <TodoList_R />
                <TodoList_R />
                <TodoList_R />
              </>
            )}
          </div>
        </List>
        <List className="done">
          <div className="title">
            <DoneImageSVG />
            <div className="text"></div>
          </div>
          <div className="list">
            {isDoneNone ? (
              <div className="noneImage">
                <Character3ImageSVG />
                <div className="text">
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </div>
              </div>
            ) : (
              <>
                <TodoList_R />
                <TodoList_R />
                <TodoList_R />
              </>
            )}
          </div>
        </List>
      </ContentWrap>
    </>
  );
};

export default HomePageComponent;

const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
  height: 56px;
`;

const Search = styled.div`
  display: flex;
  padding: 0 24px;

  width: 100%;
  height: 54px;

  border-radius: 24px;
  border: 2.5px solid #0f172a;
  background: #f1f5f9;
  box-shadow: 4px 2.5px 0px 0.5px #0f172a;

  & input {
    width: 100%;

    outline: none;
    border: none;
    background: #f1f5f9;
    &::placeholder {
      color: #64748b;
      font-size: 1rem;
    }
  }
`;

const AddButton = styled.div`
  display: flex;

  cursor: pointer;
`;

const ContentWrap = styled.div`
  display: flex;
  gap: 24px;

  width: 100%;

  ${media.tablet()} {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;

  ${media.mobile()} {
    gap: 0;
  }

  & .list {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;

    & .noneImage {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 50px;

      width: 100%;

      text-align: center;
      font-size: 16px;
      color: #94a3b8;

      ${media.mobile()} {
        padding-top: 0;
      }
    }

    & svg {
      height: 200px;

      ${media.mobile()} {
        height: 100px;
      }
    }
  }
`;
