import React from "react";
import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";

const AdvicePostDetailPage = ({ params }: { params: { slug: string } }) => {
  return <BoardPostDetail type={PostType.ADVICE} params={params} />;
};

export default AdvicePostDetailPage;
