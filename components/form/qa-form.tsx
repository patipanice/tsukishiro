import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";
import { CirclePicker } from "react-color";
import PostItCard from "../post-it-card";
import { FormikProps } from "formik";
import { formOptions, postBackgroundColor } from "@/constants";

interface ITopicFormProps {
  formik: FormikProps<any>;
  isDetailPage?: boolean;
  canEditPost?: boolean;
  isLoadingSubmit?: boolean;
}
const QAForm: React.FC<ITopicFormProps> = ({
  formik,
  isDetailPage = false,
  canEditPost = false,
  isLoadingSubmit = false,
}) => {
  const isDisabled = isDetailPage && !canEditPost;

  return (
    <section className="flex flex-col gap-6 w-full py-6">
      {!isDetailPage && (
        <h1 className="text-lg text-sky-700">คำถามที่ต้องการถาม</h1>
      )}
      <Input
        isRequired
        label="คำถาม"
        placeholder="ระบุคำถามที่ต้องการถาม เรื่องส่วนตัวบางเรื่องอาจจะไม่สามารถตอบได้"
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
        isReadOnly={isDisabled}
      />

      <Input
        label="คุณคือใคร"
        placeholder="ถ้าไม่ต้องการระบุชื่อข้ามไปได้เลย"
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        isReadOnly={isDisabled}
        maxLength={20}
      />
      <div className="flex gap-4">
        <Select
          label="อายุ"
          className="max-w-sm"
          onChange={(e) => formik.setFieldValue("age", e.target.value)}
          selectedKeys={[formik.values.age]}
          isDisabled={isDisabled}
          placeholder="ไม่จำเป็นต้องระบุ"
        >
          {formOptions.age.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="เพศ"
          className="max-w-sm"
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
          selectedKeys={[formik.values.gender]}
          isDisabled={isDisabled}
          placeholder="ไม่จำเป็นต้องระบุ"
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
            colors={postBackgroundColor}
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
        isDisabled={isDisabled}
      >
        <span className="text-sm"> ต้องการให้แสดงคำถามในบอร์ด</span>
      </Checkbox>
      {!isDisabled && (
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
          {!canEditPost ? "ติดคำถามลงในบอร์ด" : "ยืนยันการแก้ไข"}
        </Button>
      )}
    </section>
  );
};

export default QAForm;
