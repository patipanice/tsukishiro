"use client";

import React from "react";
import { HourglassDone } from "../icons/HourGlassIcon";
import { Topic } from "../icons/Topic";
import { PostStatus } from "@/enums/post.enum";
import { Select, SelectItem } from "@nextui-org/select";

const postStatusOptions = [
  {
    key: PostStatus.PENDING,
    label: "ยังไม่ได้ให้คำปรึกษา",
    icon: <HourglassDone />,
  },
  {
    key: PostStatus.DONE,
    label: "ให้คำปรึกษาแล้ว",
    icon: <Topic />,
  },
];

interface IPostStatusSelectProps {
  value: PostStatus | string;
  onChange: (value: PostStatus) => void;
  isFilter?: boolean;
}

const PostStatusSelect: React.FC<IPostStatusSelectProps> = ({
  value,
  onChange,
  isFilter = false,
}) => {
  return (
    <Select
      label="สถานะ"
      className="w-full md:max-w-44"
      size="sm"
      onChange={(e) => {
        if (e.target.value && !isFilter) {
          onChange(e.target.value as PostStatus);
        }
        if(isFilter) {
          onChange(e.target.value as PostStatus);
        }
      }}
      selectedKeys={[value]}
    >
      {postStatusOptions.map((option) => (
        <SelectItem key={option.key} selectedIcon={option.icon}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default PostStatusSelect;
