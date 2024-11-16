import { styled } from "styled-components";
import { CheckNoIconSVG, CheckYesIconSVG } from "../../../public/svgs/IconSVG";
import { useState } from "react";

const TodoList_R = () => {
  const [isDone, setIsDone] = useState<boolean>(false);

  return (
    <Layout style={{ background: isDone ? "#EDE9FE" : "#fff" }}>
      <Icon onClick={() => setIsDone(!isDone)}>
        {isDone ? <CheckYesIconSVG /> : <CheckNoIconSVG />}
      </Icon>
      <div
        className="text"
        style={{ textDecoration: isDone ? "line-through" : "unset" }}
      >
        비타민 챙겨먹기
      </div>
    </Layout>
  );
};

export default TodoList_R;

const Layout = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 12px;
  gap: 16px;

  width: 100%;
  height: 50px;

  border-radius: 27px;
  border: 2px solid #0f172a;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;

  cursor: pointer;

  & svg {
    display: flex;
    width: 35px;
    height: 50px;
    padding: 1px;
    border-radius: 100%;
  }
`;
