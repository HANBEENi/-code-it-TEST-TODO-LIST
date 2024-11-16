"use client";

import { media } from "@/styles/mediaQuery";
import { styled } from "styled-components";
import { LogoImageSVG } from "../../../public/svgs/ImageSVG";

const Header = () => {
  return (
    <Layout>
      <Contents>
        <Logo>
          <LogoImageSVG />
        </Logo>
      </Contents>
    </Layout>
  );
};

export default Header;

const Layout = styled.div`
  display: flex;
  justify-content: center;

  width: 100vw;
  height: 60px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: start;
  padding: 0 24px;

  width: 100%;
  max-width: 1200px;

  background: #c92ba23e;

  ${media.tablet()} {
    background: #3f3f;
    padding: 0 24px;
  }
  ${media.mobile()} {
    background: #3f3fff;
    padding: 0 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
