"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { PostStatus, PostType } from "@/enums/post.enum";
import { HourglassDone } from "../icons/HourGlassIcon";
import { Topic } from "../icons/Topic";

const getPostStatusOptions = (type: PostType) => {
  const postStatusOptions = [
    {
      key: PostStatus.PENDING,
      label:
        type === PostType.ADVICE ? "ยังไม่ได้ให้คำปรึกษา" : "ยังไม่ได้พูดคุย",
      icon: <HourglassDone />,
    },
    {
      key: PostStatus.DONE,
      label: type === PostType.ADVICE ? "ให้คำปรึกษาแล้ว" : "ได้พูดคุยแล้ว",
      icon: <Topic />,
    },
  ];

  return postStatusOptions;
};

interface IPostStatusSelectProps {
  value?: PostStatus;
  type: PostType
  onChange: (value: PostStatus) => void;
  isFilter?: boolean;
}

const PostStatusSelect: React.FC<IPostStatusSelectProps> = ({
  value,
  type,
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
      {getPostStatusOptions(type).map((option) => (
        <SelectItem key={option.key} selectedIcon={option.icon}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default PostStatusSelect;
