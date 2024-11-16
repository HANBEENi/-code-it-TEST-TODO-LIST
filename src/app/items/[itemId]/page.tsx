"use client";

/*
 * [PAGE: 할 일 상세 페이지]
 */

import DetailPageComponent from "@/components/Pages/DetailPage";

const HomePage = ({ params }: { params: { itemId: string } }) => {
  const { itemId } = params;

  return <DetailPageComponent itemId={itemId} />;
};

export default HomePage;
