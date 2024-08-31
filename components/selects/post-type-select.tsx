import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { PostType } from "@/enums/post.enum";
import { HourglassDone } from "../icons/HourGlassIcon";
import { Topic } from "../icons/Topic";
import { AskubuntuIcon } from "../icons/AskIcon";

const postTypeOptions = [
  {
    key: PostType.ADVICE,
    label: "ถามปัญหา",
    icon: <HourglassDone />,
  },
  {
    key: PostType.TOPIC,
    label: "เสนอหัวข้อ",
    icon: <Topic />,
  },
  {
    key: PostType.QA,
    label: "ถามคำถาม Q&A",
    icon: <AskubuntuIcon />,
  },
];

interface IPostTypeSelectProps {
  value?: PostType;
  onChange: (value: PostType) => void;
  isFilter?: boolean;
}

const PostTypeSelect: React.FC<IPostTypeSelectProps> = ({
  value,
  onChange,
  isFilter = false,
}) => {
  return (
    <Select
      className="w-full md:max-w-56"
      label="ประเภท"
      size="sm"
      selectedKeys={value ? [value] : []}
      onChange={(e) => {
        if (e.target.value && !isFilter) {
          onChange(e.target.value as PostType);
        }
        if (isFilter) {
          onChange(e.target.value as PostType);
        }
      }}
    >
      {postTypeOptions.map((option) => (
        <SelectItem key={option.key} selectedIcon={option.icon}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default PostTypeSelect;
