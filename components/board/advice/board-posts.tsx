import PostItCard from "@/components/post-it-card";
import { IAdviceForm } from "@/types";
import React from "react";

interface BoardPostsProps {
  data?: IAdviceForm[];
  onClickCardItemHandler: (id: string) => void
}

const BoardPosts: React.FC<BoardPostsProps> = ({
  data = [],
  onClickCardItemHandler,
}) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.length > 0 ? (
        data?.map((item: IAdviceForm) => (
          <PostItCard
            item={item}
            onClickCardItemHandler={onClickCardItemHandler}
            key={item.id}
          />
        ))
      ) : (
        <p>ไม่พบข้อมูล</p>
      )}
    </div>
  );
};

export default BoardPosts;
