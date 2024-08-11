import React from "react";
import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";

const TopicPostDetailPage = ({ params }: { params: { slug: string } }) => {
  return <BoardPostDetail type={PostType.TOPIC} params={params} />;
};

export default TopicPostDetailPage;
