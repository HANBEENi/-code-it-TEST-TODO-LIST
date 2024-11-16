"use client";

import { media } from "@/styles/mediaQuery";
import { styled } from "styled-components";
import { LogoImageSVG } from "../../../public/svgs/ImageSVG";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <Layout>
      <Contents>
        <Logo onClick={() => router.push("/")}>
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

  ${media.tablet()} {
    padding: 0 24px;
  }
  ${media.mobile()} {
    padding: 0 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
