"use client";
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Medal } from "@/components/icons/Medal";
import stats from "@/stats.json";

const getMonthTH = (month: string) => {
  switch (month) {
    case "01":
      return "มกราคม";
    case "02":
      return "กุมภาพันธ์";
    case "03":
      return "มีนาคม";
    case "04":
      return "เมษายน";
    case "05":
      return "พฤษภาคม";
    case "06":
      return "มิถุนายน";
    case "07":
      return "กรกฎาคม";
    case "08":
      return "สิงหาคม";
    case "09":
      return "กันยายน";
    case "10":
      return "ตุลาคม";
    case "11":
      return "พฤศจิกายน";
    case "12":
      return "ธันวาคม";
    default:
      return "";
  }
};

const BoardStatDetail = ({ params }: { params: { slug: string } }) => {
  const monthAndYear = params.slug;

  const data = stats.find((stat) => stat.monthAndYear === monthAndYear);

  const monthTH = getMonthTH(monthAndYear.split("-")[0]);
  const year = monthAndYear.split("-")[1];

  if (!data) {
    return <p>ไม่พบข้อมูล</p>;
  }

  return (
    <div>
      <div className="w-full text-center">
        <p className="font-medium text-base md:text-2xl">
          สถิติ TIKTOK LIVE ในเดือน{monthTH}
        </p>
        <p className="text-secondary-400 text-sm">
          2 {monthTH} {year} - 29 {monthTH} {year}
        </p>
      </div>
      <div className="w-full text-center space-y-10 mt-10 flex items-center flex-col gap-3">
        {/* <Overviews {...data} /> */}
        {/* i want image center  */}
        <Image alt="overview" src={data.overview} width={450} className="" />
        <div className="flex flex-col md:flex-row justify-around gap-10 items-center justify-items-center">
          <BoardCard
            type="hour"
            image1={data.topTenUser.liveTime.oneToFive}
            image2={data.topTenUser.liveTime.sixToTen}
          />
          <BoardCard
            type="diamond"
            image1={data.topTenUser.diamond.oneToFive}
            image2={data.topTenUser.diamond.sixToTen}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardStatDetail;

interface OverviewProps {
  totalLiveTime: number;
  newFollower: number;
  share: number;
  like: number;
}

const Overviews: React.FC<OverviewProps> = ({
  like,
  newFollower,
  share,
  totalLiveTime,
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <Overview
        value={`${totalLiveTime} ชม.`}
        type="ระยะเวลา LIVE"
        valueColor="text-primary-500"
      />
      <Overview
        value={`${newFollower} คน`}
        type="ผู้ติดตามใหม่"
        valueColor="text-yellow-500"
      />
      {/* <Overview value={`${like} K`} type="ถูกใจ" valueColor="text-green-500" />
      <Overview value={`${share}`} type="แชร์" valueColor="text-pink-500" /> */}
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
    <div>
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
        <p>
          10{" "}
          {type === "hour"
            ? "อันดับชั่วโมงดูไลฟ์มากที่สุด"
            : "อันดับยอดเพชรมากที่สุด"}
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center pt-4">
        <div className="justify-between flex flex-row items-center gap-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src={image1}
            width={240}
          />
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src={image2}
            width={240}
          />
        </div>
      </CardBody>
    </Card>
  );
};
