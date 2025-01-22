import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { PostStatus, PostType } from "@/enums/post.enum";
import { HourglassDone } from "../icons/HourGlassIcon";
import { Topic } from "../icons/Topic";
import { getPostStatusLabel } from "../board/board-post-detail";

const getPostStatusOptions = (type: PostType) => {
  const postStatusOptions = [
    {
      key: PostStatus.PENDING,
      label:
        getPostStatusLabel(type, PostStatus.PENDING) || "ยังไม่ได้ให้คำปรึกษา",
      icon: <HourglassDone />,
    },
    {
      key: PostStatus.DONE,
      label:
        getPostStatusLabel(type, PostStatus.DONE) || "ยังไม่ได้ให้คำปรึกษา",
      icon: <Topic />,
    },
  ];

  return postStatusOptions;
};

interface IPostStatusSelectProps {
  value?: PostStatus;
  type: PostType;
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
