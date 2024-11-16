# Todo List 프로젝트

할 일을 관리할 수 있는 간단한 웹 애플리케이션입니다. 새로운 할 일을 추가하고, 수정하거나 삭제할 수 있으며, 메모 및 이미지를 첨부할 수 있습니다.

---

## 주요 기능

- **할 일 관리**: 할 일을 추가, 수정, 삭제할 수 있습니다.
- **진행 상태**: 할 일의 완료 여부를 체크할 수 있습니다.
- **메모 작성**: 할 일에 메모를 추가할 수 있습니다.
- **이미지 업로드**: 할 일에 이미지를 첨부할 수 있습니다.
  - 이미지 파일명은 영어로만 작성되어야 하며, 크기는 5MB 이하여야 합니다.
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 환경에 최적화된 UI 제공.

---

## 사용 기술

- **프론트엔드**: Next.js, TypeScript, Styled-components
- **API 요청**: Axios

---

## 설치 및 실행 방법

### 사전 준비

- Node.js 설치
- npm 설치

### 설치 및 실행
- npm i
- 환경 변수 설정(.env)
  - NEXT_PUBLIC_TENANT_ID=been-iruda
  - NEXT_PUBLIC_API_URL=https://assignment-todolist-api.vercel.app/api
- 개발 서버 실행
  npm run dev
