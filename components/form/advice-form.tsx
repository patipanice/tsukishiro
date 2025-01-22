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
        label="ปัญหาที่ต้องการปรึกษา"
        placeholder="อธิบายปัญหาที่ต้องการปรึกษา จะพิมพ์ยาวแค่ไหนก็ได้เลยย :)"
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
        isReadOnly={isDisabled}
      />
      <Slider
        color="success"
        label="ความรู้สึกที่มีต่อปัญหานี้"
        showTooltip={true}
        hideValue={true}
        step={1}
        value={formik.values.feeling}
        formatOptions={{ style: "decimal" }}
        maxValue={5}
        minValue={1}
        isDisabled={isDisabled}
        classNames={{
          base: "max-w-md gap-3",
          track: "border-s-green-100",
          filler: "bg-gradient-to-r from-green-100 to-green-500",
        }}
        startContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M6.67 9.665a.75.75 0 0 0-1.34.67c.403.809 1.452 1.415 2.67 1.415s2.267-.606 2.67-1.415a.75.75 0 1 0-1.34-.67c-.097.191-.548.585-1.33.585s-1.233-.394-1.33-.585M10 8a.75.75 0 0 1-.75-.75v-1a.75.75 0 0 1 1.5 0v1A.75.75 0 0 1 10 8m-4.75-.75a.75.75 0 0 0 1.5 0v-1a.75.75 0 0 0-1.5 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        endContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-5.67 2.835a.75.75 0 1 0 1.34-.67C10.268 9.356 9.219 8.75 8 8.75s-2.267.606-2.67 1.415a.75.75 0 1 0 1.34.67c.097-.191.548-.585 1.33-.585s1.233.394 1.33.585M10 8a.75.75 0 0 1-.75-.75v-1a.75.75 0 0 1 1.5 0v1A.75.75 0 0 1 10 8m-4.75-.75a.75.75 0 0 0 1.5 0v-1a.75.75 0 0 0-1.5 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        marks={formOptions.feeling}
        defaultValue={0}
        className="max-w-md"
        onChange={(value) => formik.setFieldValue("feeling", value)}
      />
      <p className="text-sm text-gray-500">
        <span>1 = เฉยๆคิดว่าไม่กังวลมาก</span> <br /> 2 = มีความกังวลเล็กน้อย
        <br /> 3 = กังวลและคิดถึงมันบ่อย <br /> 4 =
        มีความเครียดมาเป็นระยะเวลาหนึ่ง
        <br /> 5 = มีความเครียดกับปัญหาและกระทบกับสุขภาพจิต
      </p>
      <Input
        label="ระยะเวลาที่เกิดปัญหา"
        placeholder="ใส่ระยะเวลาที่เกิดปัญหา ถ้าไม่แน่ใจไม่ต้องกรอก"
        type="text"
        name="period"
        onChange={formik.handleChange}
        value={formik.values.period}
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
      <div className="space-y-2">
        <p>เลือกสีโพส</p>
        {!isDisabled && (
          <CirclePicker
            colors={postBackgroundColor}
            color={formik.values.postColor}
            onChange={(color) => {
              if (!isDisabled) formik.setFieldValue("postColor", color.hex);
            }}
          />
        )}
      </div>
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
        <span className="text-sm"> ต้องการให้แสดงปัญหานี้ลงในบอร์ด</span>
      </Checkbox>
      {!isDisabled && (
        <Button
          color="primary"
          className="w-full max-w-md mt-5"
          onClick={formik.handleSubmit}
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
          {!canEditPost ? "ติดหัวข้อลงในบอร์ด" : "ยืนยันการแก้ไข"}
        </Button>
      )}
    </section>
  );
};

export default AdviceForm;
