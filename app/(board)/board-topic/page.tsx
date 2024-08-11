import Board from "@/components/board/board";
import { PostType } from "@/enums/post.enum";

const BoardTopic = () => {
  return <Board type={PostType.TOPIC} />;
};

export default BoardTopic;
