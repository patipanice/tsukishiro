import React from "react";
import { Select, SelectItem } from "@heroui/select";

import { HourglassDone } from "../icons/HourGlassIcon";
import { Topic } from "../icons/Topic";

import { PostPublishStatus } from "@/enums/post.enum";

const postStatusOptions = [
  {
    key: PostPublishStatus.PUBLISH,
    label: "เผยแพร่",
    icon: <HourglassDone />,
  },
  {
    key: PostPublishStatus.UNPUBLISHED,
    label: "ไม่เผยแพร่",
    icon: <Topic />,
  },
];

interface IPostStatusSelectProps {
  value?: PostPublishStatus;
  onChange: (value: "1" | "0" | string) => void;
  isFilter?: boolean;
}

const PostPublishSelect: React.FC<IPostStatusSelectProps> = ({
  value,
  onChange,
  isFilter = false,
}) => {
  return (
    <Select
      className="w-full md:max-w-44"
      label="สถานะ"
      selectedKeys={value ? [value] : []}
      size="sm"
      onChange={(e) => {
        if (e.target.value && !isFilter) {
          onChange(e.target.value as PostPublishStatus);
        }
        if (isFilter) {
          onChange(e.target.value as PostPublishStatus);
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

export default PostPublishSelect;
