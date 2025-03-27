import React from "react";
import { Select, SelectItem } from "@heroui/select";

import { OrderBy } from "@/enums/post.enum";

const options = [
  {
    key: OrderBy.DESCENDING,
    label: "ใหม่สุด",
  },
  {
    key: OrderBy.ASCENDING,
    label: "เก่าสุด",
  },
];

interface IPostStatusSelectProps {
  value?: OrderBy;
  onChange: (value: OrderBy) => void;
  isFilter?: boolean;
}

const PostSortingDate: React.FC<IPostStatusSelectProps> = ({
  value,
  onChange,
  isFilter = false,
}) => {
  return (
    <Select
      className="w-full md:max-w-44"
      label="เรียงโดย"
      selectedKeys={value ? [value] : []}
      size="sm"
      onChange={(e) => {
        if (e.target.value && !isFilter) {
          onChange(e.target.value as OrderBy);
        }
        if (isFilter) {
          onChange(e.target.value as OrderBy);
        }
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default PostSortingDate;
