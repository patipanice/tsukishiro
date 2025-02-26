import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { CirclePicker } from "react-color";

import PostItCard from "../post-it-card";

import { useAuthContext } from "@/contexts/auth-context";
import { formOptions, postBackgroundColor } from "@/config/constants";

interface IAdviceFormProps {
  formik: any;
  isDetailPage?: boolean;
  canEditPost?: boolean;
  isLoadingSubmit?: boolean;
}
const AdviceForm: React.FC<IAdviceFormProps> = ({
  formik,
  isDetailPage = false,
  isLoadingSubmit = false,
  canEditPost = false,
}) => {
  const { user } = useAuthContext();
  const isDisabled = isDetailPage && !canEditPost;

  return (
    <section className="flex flex-col gap-6 w-full pb-5">
      {!isDetailPage && <h1 className="text-lg text-sky-700">ขอคำปรึกษา</h1>}
      <Textarea
        isRequired
        isReadOnly={isDisabled}
        label="ปัญหาที่ต้องการปรึกษา"
        name="message"
        placeholder="อธิบายปัญหาที่ต้องการปรึกษา จะพิมพ์ยาวแค่ไหนก็ได้เลยย :)"
        value={formik.values.message}
        onChange={formik.handleChange}
      />
      <Slider
        className="max-w-md"
        classNames={{
          base: "max-w-md gap-3",
          track: "border-s-green-100",
          filler: "bg-gradient-to-r from-green-100 to-green-500",
        }}
        color="success"
        defaultValue={0}
        endContent={
          <svg
            height="20"
            viewBox="0 0 16 16"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-5.67 2.835a.75.75 0 1 0 1.34-.67C10.268 9.356 9.219 8.75 8 8.75s-2.267.606-2.67 1.415a.75.75 0 1 0 1.34.67c.097-.191.548-.585 1.33-.585s1.233.394 1.33.585M10 8a.75.75 0 0 1-.75-.75v-1a.75.75 0 0 1 1.5 0v1A.75.75 0 0 1 10 8m-4.75-.75a.75.75 0 0 0 1.5 0v-1a.75.75 0 0 0-1.5 0z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        }
        formatOptions={{ style: "decimal" }}
        hideValue={true}
        isDisabled={isDisabled}
        label="ความรู้สึกที่มีต่อปัญหานี้"
        marks={formOptions.feeling}
        maxValue={5}
        minValue={1}
        showTooltip={true}
        startContent={
          <svg
            height="20"
            viewBox="0 0 16 16"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M6.67 9.665a.75.75 0 0 0-1.34.67c.403.809 1.452 1.415 2.67 1.415s2.267-.606 2.67-1.415a.75.75 0 1 0-1.34-.67c-.097.191-.548.585-1.33.585s-1.233-.394-1.33-.585M10 8a.75.75 0 0 1-.75-.75v-1a.75.75 0 0 1 1.5 0v1A.75.75 0 0 1 10 8m-4.75-.75a.75.75 0 0 0 1.5 0v-1a.75.75 0 0 0-1.5 0z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        }
        step={1}
        value={formik.values.feeling}
        onChange={(value) => formik.setFieldValue("feeling", value)}
      />
      <p className="text-sm text-gray-500">
        <span>1 = เฉยๆคิดว่าไม่กังวลมาก</span> <br /> 2 = มีความกังวลเล็กน้อย
        <br /> 3 = กังวลและคิดถึงมันบ่อย <br /> 4 =
        มีความเครียดมาเป็นระยะเวลาหนึ่ง
        <br /> 5 = มีความเครียดกับปัญหาและกระทบกับสุขภาพจิต
      </p>
      <Input
        isReadOnly={isDisabled}
        label="ระยะเวลาที่เกิดปัญหา"
        name="period"
        placeholder="ใส่ระยะเวลาที่เกิดปัญหา ถ้าไม่แน่ใจไม่ต้องกรอก"
        type="text"
        value={formik.values.period}
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
      <div className="space-y-2">
        <p>เลือกสีโพส</p>
        {!isDisabled && (
          <CirclePicker
            color={formik.values.postColor}
            colors={postBackgroundColor}
            onChange={(color) => {
              if (!isDisabled) formik.setFieldValue("postColor", color.hex);
            }}
          />
        )}
      </div>
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
          onClick={formik.handleSubmit}
        >
          {!canEditPost ? "ติดหัวข้อลงในบอร์ด" : "ยืนยันการแก้ไข"}
        </Button>
      )}
    </section>
  );
};

export default AdviceForm;
