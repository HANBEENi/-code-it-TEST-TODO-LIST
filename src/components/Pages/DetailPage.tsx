"use client";
/**
 * 상세페이지 컴포넌트
 */
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
  imageUrl?: any;
}

const DetailPageComponent = ({ itemId }: { itemId: string }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [isMemoEdit, setIsMemoEdit] = useState<boolean>(false);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [memoEdit, setMemoEdit] = useState<string>("");
  const [nameEdit, setNameEdit] = useState<string>("");
  const [isCompletedEdit, setIsCompletedEdit] = useState<boolean>(false);

  const router = useRouter();

  // 데이터 불러오기
  const getTodoData = async () => {
    if (!itemId) return;
    try {
      const response = await GET(`/items/${itemId}`);
      const data = response.data;
      setData(response.data);
      setIsCompletedEdit(data.isCompleted);
      setSelectedImage(data.imageUrl);
      setMemoEdit(data.memo);
      setNameEdit(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  // 메모 수정
  const handlePatchTodo = async () => {
    try {
      // 변경된 값만 추출하여 payload 구성
      const payload: Record<string, any> = {};

      if (memoEdit !== data?.memo) {
        payload.memo = memoEdit;
      }

      if (nameEdit !== data?.name) {
        payload.name = nameEdit;
      }

      if (selectedImage !== data?.imageUrl) {
        payload.imageUrl = selectedImage;
      }

      if (isCompletedEdit !== data?.isCompleted) {
        payload.isCompleted = isCompletedEdit;
      }

      // 변경된 값이 없으면 PATCH 요청을 보내지 않음
      if (Object.keys(payload).length === 0) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      // PATCH 요청
      await PATCH(`/items/${itemId}`, payload);
      alert("수정 완료 되었습니다.");
      router.push("/");
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
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // 이미지 업로드 처리
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await POST(`/images/upload`, formData);

        // 서버에서 반환된 URL
        const imageUrl = response.data.url;
        console.log("업로드된 이미지 URL: ", imageUrl);

        // URL을 상태에 저장
        setSelectedImage(imageUrl); // 유효한 파일 저장
      } catch (error) {
        console.error("이미지 업로드 실패: ", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  //페이지로딩 시 데이터 불러오기
  useEffect(() => {
    getTodoData();
  }, [itemId]);

  return (
    <>
      <Title
        style={{ background: isCompletedEdit ? "#EDE9FE" : "#fff" }}
        onClick={() => setIsNameEdit(true)}
      >
        {isCompletedEdit ? (
          <div onClick={() => setIsCompletedEdit(!isCompletedEdit)}>
            <CheckYesIconSVG />
          </div>
        ) : (
          <div onClick={() => setIsCompletedEdit(!isCompletedEdit)}>
            <CheckNoIconSVG />
          </div>
        )}
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
            backgroundImage: data?.imageUrl
              ? `url(${data?.imageUrl})`
              : selectedImage
              ? `url(${selectedImage})`
              : undefined,
          }}
        >
          {selectedImage ? "" : <GaleryIconSVG />}
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
              placeholder="메모를 입력해주세요."
              value={memoEdit ?? data?.memo}
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
