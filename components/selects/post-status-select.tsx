"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { PostStatus } from "@/enums/post.enum";
import { HourglassDone } from "../icons/HourGlassIcon";
import { Topic } from "../icons/Topic";

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
  value?: PostStatus;
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
      className="w-full md:max-w-56"
      label="สถานะ"
      size="sm"
      selectedKeys={value ? [value] : []}
      onChange={(e) => {
        if (e.target.value && !isFilter) {
          onChange(e.target.value as PostStatus);
        }
        if (isFilter) {
          onChange(e.target.value as PostStatus);
        }
      }}
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
