import React from "react";

import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";

const AdvicePostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params);

  return <BoardPostDetail params={slug} type={PostType.ADVICE} />;
};

export default AdvicePostDetailPage;
