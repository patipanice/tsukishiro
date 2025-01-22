"use client";
import React from "react";
import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { TrophyIcon } from "@/components/icons/TrophyIcon";
import { MedalRibbonsStarBoldDuotoneIcon } from "@/components/icons/MedalRibbonsStarBoldDuotoneIcon";
import { Medal } from "@/components/icons/Medal";

const BoardStatDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex items-center gap-3 justify-center">
        <p className="text-semibold text-base md:text-2xl">
          สถิติ TikTok Live ในเดือน
          <span className="text-primary-500 font-bold">สิงหาคม</span>
        </p>
        <TrophyIcon className="text-lg md:text-3xl" />
      </div>
      {/* <Card>
        <CardBody> */}
      <Overviews />
      {/* </CardBody>
      </Card> */}
{/* 
      <div className="flex justify-around gap-10">
        <BoardCard type="hour" />
        <BoardCard type="diamond" />
      </div> */}
    </div>
  );
};

export default BoardStatDetail;

const Overviews = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Overview value="618 ชม." type="ระยะเวลา LIVE" />
      <Overview value="214 คน" type="ผู้ติดตามใหม่" />
      <Overview value="564.6 K" type="ถูกใจ" />
      <Overview value="105" type="แชร์" />
    </div>
  );
};

const Overview = ({
  value,
  type,
}: {
  value: string | number;
  type: string;
}) => {
  return (
    <div className="">
      <p className="font-extrabold text-4xl text-yellow-600">{value}</p>
      <p className="font-light text-gray-600">{type}</p>
    </div>
  );
};

const BoardCard = ({ type }: { type: string }) => {
  return (
    <Card className="py-4 max-w-[500px]">
      <CardHeader className="pb-0 pt-2 px-4 item-center justify-center gap-2">
        <p>
          10{" "}
          {type === "hour"
            ? "อันดับยูสเซอร์ที่มีชั่วโมงดูมากที่สุด"
            : "อันดับยูสเซอร์ที่ยอดเพชรเยอะที่สุด"}
        </p>
        <Medal />
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center">
        <div className="justify-between flex flex-row items-center gap-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src="/image2.jpeg"
            width={220}
          />
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src="/image3.jpeg"
            width={220}
          />
        </div>
      </CardBody>
    </Card>
  );
};
