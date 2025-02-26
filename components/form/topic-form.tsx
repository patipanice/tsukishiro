import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Select, SelectItem } from "@heroui/select";
import { CirclePicker } from "react-color";
import { FormikProps } from "formik";

import PostItCard from "../post-it-card";

import { formOptions, postBackgroundColor } from "@/config/constants";

interface ITopicFormProps {
  formik: FormikProps<any>;
  isDetailPage?: boolean;
  canEditPost?: boolean;
  isLoadingSubmit?: boolean;
}
const TopicForm: React.FC<ITopicFormProps> = ({
  formik,
  isDetailPage = false,
  canEditPost = false,
  isLoadingSubmit = false,
}) => {
  const isDisabled = isDetailPage && !canEditPost;

  return (
    <section className="flex flex-col gap-6 w-full py-6">
      {!isDetailPage && (
        <h1 className="text-lg text-sky-700">เสนอหัวข้อที่ต้องการให้พูดคุย</h1>
      )}
      <Input
        isRequired
        isReadOnly={isDisabled}
        label="ระบุหัวข้อที่ต้องการให้พูดคุย"
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
      />

      <Input
        isReadOnly={isDisabled}
        label="คุณคือใคร"
        maxLength={20}
        name="name"
        placeholder="ถ้าไม่ต้องการระบุชื่อข้ามไปได้เลย"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <div className="flex gap-4">
        <Select
          className="max-w-sm"
          isDisabled={isDisabled}
          label="อายุ"
          placeholder="ไม่จำเป็นต้องระบุ"
          selectedKeys={[formik.values.age]}
          onChange={(e) => formik.setFieldValue("age", e.target.value)}
        >
          {formOptions.age.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          className="max-w-sm"
          isDisabled={isDisabled}
          label="เพศ"
          placeholder="ไม่จำเป็นต้องระบุ"
          selectedKeys={[formik.values.gender]}
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
        >
          {formOptions.gender.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
      {!isDisabled && (
        <div className="space-y-2">
          <p>เลือกสีของโพส</p>
          <CirclePicker
            color={formik.values.postColor}
            colors={postBackgroundColor}
            onChange={(color) => formik.setFieldValue("postColor", color.hex)}
          />
        </div>
      )}
      <PostItCard
        isYourPost={false}
        item={{
          id: "id",
          postColor: formik.values.postColor,
          name: formik.values.name,
          message: formik.values.message,
          createdAt: formik.values.createdAt,
        }}
        width={260}
        onClickCardItemHandler={() => {}}
      />
      <Checkbox
        isDisabled={isDisabled}
        isSelected={formik.values.isPublish}
        onChange={(e) => formik.setFieldValue("isPublish", e.target.checked)}
      >
        <span className="text-sm"> ต้องการให้แสดงปัญหานี้ลงในบอร์ด</span>
      </Checkbox>
      {!isDisabled && (
        <Button
          className="w-full max-w-md mt-5"
          color="primary"
          isDisabled={!formik.isValid || formik.values.message === ""}
          isLoading={isLoadingSubmit}
          startContent={
            <svg
              height="20"
              viewBox="0 0 1024 1023"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m896 800l128 223l-224-128l-1-6l-168-167l-152 151q-42 42-95-10V684L126 416l-13 12q-19 20-46.5 20t-47-19.5t-19.5-47T19 334L335 19q20-19 47.5-19t47 19T449 65.5T429 113l-13 13l269 258l179 1q52 52 9 94L722 630l168 168z"
                fill="currentColor"
              />
            </svg>
          }
          onPress={() => formik.handleSubmit()}
        >
          {!canEditPost ? "ติดหัวข้อลงในบอร์ด" : "ยืนยันการแก้ไข"}
        </Button>
      )}
    </section>
  );
};

export default TopicForm;
