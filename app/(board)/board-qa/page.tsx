import Board from "@/components/board/board";
import { PostType } from "@/enums/post.enum";

const BoardQA = () => {
  return <Board type={PostType.QA} />;
};

export default BoardQA;
