"use client";
/**
 * 공통 레이아웃
 */
import { styled } from "styled-components";
import Header from "@/components/Layout/Header";
import { media } from "@/styles/mediaQuery";

const CommonLayout = ({ children }: any) => {
  return (
    <Layout>
      <Header />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default CommonLayout;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;

  width: 100vw;
  min-height: 100vh;

  ${media.tablet()} {
    padding: 0 24px;
  }
  ${media.mobile()} {
    padding: 0 16px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  gap: 40px;

  max-width: 1200px;
  width: 100%;
  height: 100%;

  ${media.mobile()} {
    padding: 16px 15px;
    gap: 24px;
  }
`;
