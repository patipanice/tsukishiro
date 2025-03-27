import React from "react";

import PostItCard from "@/components/post-it-card";
import { IAdviceForm } from "@/types";

interface BoardPostsProps {
  data?: IAdviceForm[];
  userId?: string
  onClickCardItemHandler: (id: string) => void
}

const BoardPosts: React.FC<BoardPostsProps> = ({
  data = [],
  userId,
  onClickCardItemHandler,
}) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.length > 0 ? (
        data?.map((item: IAdviceForm) => (
          <PostItCard
            key={item.id}
            isYourPost={item.userId === userId}
            item={item}
            onClickCardItemHandler={onClickCardItemHandler}
          />
        ))
      ) : (
        <p>ไม่พบข้อมูล</p>
      )}
    </div>
  );
};

export default BoardPosts;
