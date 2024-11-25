import { styled } from "styled-components";
import {
  Character1ImageSVG,
  Character3ImageSVG,
  DoneImageSVG,
  TodoImageSVG,
} from "../../../public/svgs/ImageSVG";
import {
  AddGrayButtonSVG,
  AddTextGrayButtonSVG,
} from "../../../public/svgs/ButtonSVG";
import TodoList_R from "../Reusable/TodoList_R";
import { media } from "@/styles/mediaQuery";
import { useEffect, useState } from "react";
import { GET, PATCH, POST } from "@/api/axios";

interface Data {
  id: string;
  name: string;
  isCompleted: boolean;
  memo: string;
}
const HomePageComponent = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [newTodo, setNewTodo] = useState<string>(""); // 새 할 일 입력 값
  const [todoList, setTodoList] = useState<Data[]>([]);
  const [doneList, setDoneList] = useState<Data[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /* TODO 불러오기 */
  const getTodoList = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await GET(`/items`);
      const todos = response.data.filter((item: any) => !item.isCompleted);
      const dones = response.data.filter((item: any) => item.isCompleted);

      setTodoList(todos);
      setDoneList(dones);
    } catch (err) {
      console.error("할 일 목록 불러오기 실패: ", err);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  /** TODO 등록하기 */
  const handleAddTodo = async () => {
    if (isSubmitting || !newTodo.trim()) return;
    setIsSubmitting(true);

    try {
      await POST(`/items`, { name: newTodo });
      setNewTodo("");
      getTodoList();
    } catch (err) {
      console.error("할 일 추가 실패: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // todo<->done
  const handlePatchTodo = async (data: Data) => {
    // 백업 상태 저장
    const prevTodoList = [...todoList];
    const prevDoneList = [...doneList];

    try {
      // 1. 로컬 상태 먼저 업데이트
      if (data.isCompleted) {
        // todo -> done
        setDoneList((prev) => prev.filter((item) => item.id !== data.id));
        setTodoList((prev) => [...prev, { ...data, isCompleted: false }]);
      } else {
        // done -> todo
        setTodoList((prev) => prev.filter((item) => item.id !== data.id));
        setDoneList((prev) => [...prev, { ...data, isCompleted: true }]);
      }
      // 2. 서버에 변경 요청
      await PATCH(`/items/${data.id}`, {
        isCompleted: !data.isCompleted,
      });
    } catch (err) {
      console.error("투두 수정 실패: ", err);
      alert("상태 변경 실패");

      // 요청 실패 시 이전 상태로 롤백
      setTodoList(prevTodoList);
      setDoneList(prevDoneList);
    }
  };

  // enter 이벤트 - 할일추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo();
    }
  };

  useEffect(() => {
    // 페이지 렌더링 시 할 일 목록 가져오기
    getTodoList();
  }, []);

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
          <input
            type="text"
            placeholder="할 일을 입력해주세요."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Search>
        <AddButton onClick={handleAddTodo}>
          {isMobile ? <AddGrayButtonSVG /> : <AddTextGrayButtonSVG />}
        </AddButton>
      </SearchWrap>
      <ContentWrap>
        <List className="todo">
          <div className="title">
            <TodoImageSVG />
          </div>
          <div className="list">
            {todoList.length < 1 ? (
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
                {todoList?.map((todo: Data, idx: number) => (
                  <TodoList_R
                    key={idx}
                    isCompleted={todo.isCompleted}
                    data={todo}
                    handlePatchTodo={handlePatchTodo}
                  />
                ))}
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
            {doneList.length < 1 ? (
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
                {doneList?.map((todo: Data, idx: number) => (
                  <TodoList_R
                    key={idx}
                    isCompleted={todo.isCompleted}
                    data={todo}
                    handlePatchTodo={handlePatchTodo}
                  />
                ))}
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

    color: #0f172a;
    font-size: 1rem;

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
