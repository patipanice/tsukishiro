import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";

import { CirclePicker } from "react-color";
import PostItCard from "../post-it-card";
import { FormikProps } from "formik";

export const colors = [
  "#FF6F61", // Coral
  "#FFCCBC", // Peach
  "#FFD54F", // Amber
  "#A5D6A7", // Light Green
  "#81D4FA", // Light Blue
  "#B39DDB", // Light Purple
  "#FFAB91", // Light Salmon
  "#C5E1A5", // Pale Green
  "#B3E5FC", // Light Cyan
  "#DCE775", // Lime
  "#F48FB1", // Light Pink
  "#C5CAE9", // Light Blue Grey
  // "#E57373", // Red
  // "#F06292"  // Pink
];

const ageOptions = [
  {
    key: 0,
    label: "ไม่ต้องการระบุ",
  },
  {
    key: 1,
    label: "น้อยกว่า 20 ปี",
  },
  {
    key: 2,
    label: "21 - 30 ปี",
  },
  {
    key: 3,
    label: "31 - 40 ปี",
  },
  {
    key: 4,
    label: "41 - 50 ปี",
  },
  {
    key: 5,
    label: "51 - 60 ปี",
  },
];

const genderOptions = [
  {
    key: 0,
    label: "ไม่ต้องการระบุ",
  },
  {
    key: 1,
    label: "ชาย",
  },
  {
    key: 2,
    label: "หญิง",
  },
];

interface ITopicFormProps {
  formik: FormikProps<any>;
  isDetailPage?: boolean;
  isLoadingSubmit?: boolean;
}
const TopicForm: React.FC<ITopicFormProps> = ({
  formik,
  isDetailPage = false,
  isLoadingSubmit = false,
}) => {
  return (
    <section className="flex flex-col gap-6 w-full py-6">
      {!isDetailPage && (
        <h1 className="text-lg text-sky-700">เสนอหัวข้อที่ต้องการให้พูดคุย</h1>
      )}
      <Input
        isRequired
        label="ระบุหัวข้อที่ต้องการให้พูดคุย"
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
        isDisabled={isDetailPage}
      />

      <Input
        label="คุณคือใคร"
        placeholder="ถ้าไม่ต้องการระบุชื่อข้ามไปได้เลย"
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        isDisabled={isDetailPage}
        maxLength={20}
      />
      <div className="flex gap-4">
        <Select
          label="อายุ"
          className="max-w-sm"
          onChange={(e) => formik.setFieldValue("age", e.target.value)}
          selectedKeys={[formik.values.age]}
          isDisabled={isDetailPage}
          placeholder="ไม่จำเป็นต้องระบุ"
        >
          {ageOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="เพศ"
          className="max-w-sm"
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
          selectedKeys={[formik.values.gender]}
          isDisabled={isDetailPage}
          placeholder="ไม่จำเป็นต้องระบุ"
        >
          {genderOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
      {!isDetailPage && (
        <div className="space-y-2">
          <p>เลือกสีของโพส</p>
          <CirclePicker
            colors={colors}
            color={formik.values.postColor}
            onChange={(color) => formik.setFieldValue("postColor", color.hex)}
          />
        </div>
      )}
      <PostItCard
        item={{
          id: "id",
          postColor: formik.values.postColor,
          name: formik.values.name,
          message: formik.values.message,
          createdAt: formik.values.createdAt,
        }}
        width={260}
        onClickCardItemHandler={() => {}}
        isYourPost={false}
      />
      <Checkbox
        isSelected={formik.values.isPublish}
        onChange={(e) => formik.setFieldValue("isPublish", e.target.checked)}
        isDisabled={isDetailPage}
      >
        <span className="text-sm"> ต้องการให้แสดงปัญหานี้ลงในบอร์ด</span>
      </Checkbox>
      {!isDetailPage && (
        <Button
          color="primary"
          className="w-full max-w-md mt-5"
          onPress={() => formik.handleSubmit()}
          isDisabled={!formik.isValid || formik.values.message === ""}
          isLoading={isLoadingSubmit}
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1023"
            >
              <path
                fill="currentColor"
                d="m896 800l128 223l-224-128l-1-6l-168-167l-152 151q-42 42-95-10V684L126 416l-13 12q-19 20-46.5 20t-47-19.5t-19.5-47T19 334L335 19q20-19 47.5-19t47 19T449 65.5T429 113l-13 13l269 258l179 1q52 52 9 94L722 630l168 168z"
              />
            </svg>
          }
        >
          ติดหัวข้อลงในบอร์ด
        </Button>
      )}
    </section>
  );
};

export default TopicForm;
