import Board from "@/components/board/board";
import { PostType } from "@/enums/post.enum";

const BoardAdvice = () => {
  return <Board type={PostType.ADVICE} />;
};

export default BoardAdvice;
