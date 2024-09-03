import PostStatCard from "@/components/cards/post-stat-card";
import PostItCard from "@/components/post-it-card";


const BoardStat = () => {
  return (
    <section>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <PostStatCard
          item={{ id: "1", month: "สิงหาคม" }}
          onClickCardItemHandler={() => {}}
          isYourPost={false}
        />
         <PostStatCard
          item={{ id: "2", month: "กันยายน" }}
          onClickCardItemHandler={() => {}}
          isYourPost={false}
        />
      </div>
    </section>
  );
};

export default BoardStat;
