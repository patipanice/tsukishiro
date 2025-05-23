import React from "react";

import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";

const RequestMusicPostDetailPage = ({ params }: { params: { slug: string } }) => {
  return <BoardPostDetail params={params} type={PostType.REQUEST_MUSIC} />;
};

export default RequestMusicPostDetailPage;
