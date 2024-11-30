import React from "react";
import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";

const AdvicePostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params);
  return <BoardPostDetail type={PostType.ADVICE} params={slug} />;
};

export default AdvicePostDetailPage;
