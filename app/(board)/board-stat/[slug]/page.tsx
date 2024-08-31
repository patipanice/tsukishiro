"use client";
import React from "react";
import BoardPostDetail from "@/components/board/board-post-detail";
import { PostType } from "@/enums/post.enum";
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import { TrophyIcon } from "@/components/icons/TrophyIcon";
import { MedalRibbonsStarBoldDuotoneIcon } from "@/components/icons/MedalRibbonsStarBoldDuotoneIcon";
import { Medal } from "@/components/icons/Medal";

const BoardStatDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <div className="w-full text-center">
        <p className="font-medium text-base md:text-2xl">
          สถิติ TIKTOK LIVE ในเดือนสิงหาคม
        </p>
        <p className="text-secondary-400 text-sm">3 ส.ค. 2567 - 30 ส.ค. 2567</p>
      </div>
      <div className="w-full text-center space-y-10 mt-10">
        <Overviews />
        <div className="flex flex-col md:flex-row justify-around gap-10 items-center justify-items-center">
          <BoardCard
            type="hour"
            image1="/stat/aug-2024/hour-1.jpeg"
            image2="/stat/aug-2024/hour-2.jpeg"
          />
          <BoardCard
            type="diamond"
            image1="/stat/aug-2024/diamond-1.jpeg"
            image2="/stat/aug-2024/diamond-2.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardStatDetail;

const Overviews = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Overview
        value="61.8 ชม."
        type="ระยะเวลา LIVE"
        valueColor="text-primary-500"
      />
      <Overview
        value="214 คน"
        type="ผู้ติดตามใหม่"
        valueColor="text-yellow-500"
      />
      <Overview value="564.6 K" type="ถูกใจ" valueColor="text-green-500" />
      <Overview value="105" type="แชร์" valueColor="text-pink-500" />
    </div>
  );
};

const Overview = ({
  value,
  type,
  valueColor = "text-gray-600",
}: {
  value: string | number;
  type: string;
  valueColor?: string;
}) => {
  return (
    <div className="">
      <p
        className={`font-extrabold text-2xl md:text-3xl lg:text-4xl ${valueColor}`}
      >
        {value}
      </p>
      <p className="font-light text-gray-600 text-sm md:text-base">{type}</p>
    </div>
  );
};

const BoardCard = ({
  type,
  image1,
  image2,
}: {
  type: string;
  image1: string;
  image2: string;
}) => {
  return (
    <Card className="py-4 max-w-[500px]">
      <CardHeader className="pb-0 pt-2 px-4 item-center justify-center gap-2">
        <Medal />
        <p>10 {type === "hour" ? "อันดับชั่วโมงดูไลฟ์มากที่สุด" : "อันดับยอดเพชรมากที่สุด"}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center pt-4">
        <div className="justify-between flex flex-row items-center gap-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src={image1}
            width={220}
          />
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src={image2}
            width={220}
          />
        </div>
      </CardBody>
    </Card>
  );
};
