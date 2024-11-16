import "@/styles/globals.css";
import StyledComponentsRegistry from "@/app/registry";
import type { Metadata } from "next";
import CommonLayout from "@/components/Layout/Layout";

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <CommonLayout>{children}</CommonLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
