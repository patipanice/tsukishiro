import React from "react";
import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";
const DetailPage = ({ params }: { params: { slug: string } }) => {
  return <BoardPostDetail type={PostType.QA} params={params} />;
};

export default DetailPage;
