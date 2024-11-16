"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  CheckNoIconSVG,
  CheckYesIconSVG,
  GaleryIconSVG,
} from "../../../public/svgs/IconSVG";
import {
  DeleteButtonSVG,
  PlusButtonSVG,
  UpdateGrayButtonSVG,
} from "../../../public/svgs/ButtonSVG";
import { media } from "@/styles/mediaQuery";
import { DELETE, GET, PATCH, POST } from "@/api/axios";
import { useRouter } from "next/navigation";

interface Data {
  id: string;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

const DetailPageComponent = ({ itemId }: { itemId: string }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [isMemoEdit, setIsMemoEdit] = useState<boolean>(false);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [memoEdit, setMemoEdit] = useState<string>("");
  const [nameEdit, setNameEdit] = useState<string>("");

  const router = useRouter();

  // 데이터 불러오기
  const getTodoData = async () => {
    if (!itemId) return;
    try {
      const data = await GET(`/items/${itemId}`);
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 메모 수정
  const handlePatchTodo = async () => {
    try {
      await PATCH(`/items/${itemId}`, {
        memo: memoEdit,
      });
      alert("수정 완료 되었습니다.");
      if (selectedImage) {
        // await handleImagePost();
      }
    } catch (err) {
      console.error("투두 수정 실패: ", err);
    }
  };

  // 투두 삭제
  const deleteTodo = async () => {
    try {
      await DELETE(`/items/${itemId}`);
      alert("삭제되었습니다.");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 유효성 검사
      if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
        alert("파일 이름은 영어로만 이루어져야 합니다.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      setSelectedImage(file); // 유효한 파일 저장
    }
  };

  useEffect(() => {
    getTodoData();
  }, [itemId]);

  return (
    <>
      <Title
        style={{ background: data?.isCompleted ? "#EDE9FE" : "#fff" }}
        onClick={() => setIsNameEdit(true)}
      >
        {data?.isCompleted ? <CheckYesIconSVG /> : <CheckNoIconSVG />}
        {isNameEdit ? (
          <input
            placeholder={data?.name}
            value={nameEdit}
            onChange={(e) => setNameEdit(e.target.value)}
          />
        ) : (
          <div>{data?.name}</div>
        )}
      </Title>
      <Contents>
        <PhotoAdd
          style={{
            backgroundImage: selectedImage
              ? `url(${URL.createObjectURL(selectedImage)})`
              : undefined,
          }}
        >
          <GaleryIconSVG />
          <AddButton>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
              id="imageUpload"
            />
            <label htmlFor="imageUpload">
              <PlusButtonSVG />
            </label>
          </AddButton>
        </PhotoAdd>
        <MeMo onClick={() => setIsMemoEdit(true)}>
          <div className="title">Memo</div>
          {isMemoEdit ? (
            <textarea
              className="content"
              placeholder=""
              value={data?.memo}
              onChange={(e) => setMemoEdit(e.target.value)}
            >
              {data?.memo}
            </textarea>
          ) : (
            <div className="contentEdit">{data?.memo}</div>
          )}
        </MeMo>
      </Contents>
      <ButtonSet>
        <div onClick={handlePatchTodo}>
          <UpdateGrayButtonSVG />
        </div>
        <div onClick={deleteTodo}>
          <DeleteButtonSVG />
        </div>
      </ButtonSet>
    </>
  );
};

export default DetailPageComponent;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  width: 100%;
  height: 64px;

  border-radius: 24px;
  border: 2px solid #0f172a;

  text-decoration: underline;

  & input {
    outline: none;
    background: transparent;
    border: none;
    white-space: nowrap;

    font-size: 1.25rem;
    color: #0f172a;
  }
`;

const Contents = styled.div`
  display: flex;
  gap: 24px;

  width: 100%;

  & > * {
    border-radius: 24px;
  }

  ${media.tablet() || media.mobile()} {
    flex-direction: column;
  }
`;

const PhotoAdd = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex: 2;

  min-height: 311px;
  max-height: 311px;

  border: 3px dashed #cbd5e1;
  border-spacing: 6px;
  background: #f8fafc;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const MeMo = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 3;
  overflow: hidden;
  padding: 24px 16px;
  padding-top: 60px;

  min-height: 311px;
  max-height: 311px;

  background-image: url("/images/memoX3.png");
  background-repeat: center;
  background-size: contain;
  background-size: 115%;

  & .title {
    display: flex;
    position: absolute;
    top: 24px;

    font-weight: 800;
    font-size: 1rem;
    color: #92400e;
  }

  & .content {
    display: flex;
    overflow-y: auto;
    padding: 10px 0;

    width: 100%;
    height: fit-content;

    color: #1e293b;

    &::-webkit-scrollbar {
      display: block;
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #fde68a;
      border-radius: 3px;
    }
  }

  & textarea {
    border: unset;
    background: transparent;
    outline: none;
    resize: none;

    min-height: 229px;
    max-height: 229px;

    text-align: left;
    vertical-align: top;
    font-size: 16px;
    color: #1e293b;
  }
`;

const AddButton = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;

  & label {
    cursor: pointer;
  }
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 16px;

  width: 100%;
  height: 56px;

  ${media.tablet()} {
    justify-content: center;
  }
  ${media.mobile()} {
    justify-content: center;
  }

  & svg {
    cursor: pointer;
  }
`;
