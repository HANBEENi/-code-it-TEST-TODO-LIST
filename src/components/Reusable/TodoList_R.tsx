import { styled } from "styled-components";
import { CheckNoIconSVG, CheckYesIconSVG } from "../../../public/svgs/IconSVG";
import { useRouter } from "next/navigation";

interface Props {
  isCompleted: boolean;
  data: Data;
  handlePatchTodo: (data: Data) => void;
}
interface Data {
  id: string;
  name: string;
  isCompleted: boolean;
  memo: string;
}

const TodoList_R = ({ isCompleted, data, handlePatchTodo }: Props) => {
  const router = useRouter();

  return (
    <Layout style={{ background: isCompleted ? "#EDE9FE" : "#fff" }}>
      <Icon onClick={() => handlePatchTodo(data)}>
        {isCompleted ? <CheckYesIconSVG /> : <CheckNoIconSVG />}
      </Icon>
      <div
        onClick={() => router.push(`/items/${data.id}`)}
        className="text"
        style={{ textDecoration: isCompleted ? "line-through" : "unset" }}
      >
        {data?.name}
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

  & .text {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    cursor: pointer;
  }
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
