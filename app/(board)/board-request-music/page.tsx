import Board from "@/components/board/board";
import { PostType } from "@/enums/post.enum";

const BoardRequestMusic = () => {
  return <Board type={PostType.REQUEST_MUSIC} />;
};

export default BoardRequestMusic;
