"use client"
import { useRouter } from "next/navigation";

import PostStatCard from "@/components/cards/post-stat-card";
import stats from "@/stats.json";

const BoardStat = () => {
  const router = useRouter();

  return (
    <section>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <PostStatCard
            key={stat.monthAndYear}
            isYourPost={false}
            monthTH={stat.monthTH}
            onClickCardItemHandler={() => {
              router.push("/board-stat/" + stat.monthAndYear);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default BoardStat;
