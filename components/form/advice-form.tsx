import { Input, Textarea } from "@heroui/input";
import { Slider } from "@heroui/react";
import { FormikProps } from "formik";

import { InboxFormValues } from "@/hooks/useInboxForm";

interface AdviceFormProps {
  formik: FormikProps<InboxFormValues>;
}

const marks = Array.from({ length: 5 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

const AdviceForm: React.FC<AdviceFormProps> = ({ formik }) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex gap-x-6">
        <Input
          label="คุณคือใคร"
          labelPlacement="outside"
          name="name"
          placeholder="ถ้าไม่ต้องการระบุชื่อผู้ส่งข้ามไปได้เลยย"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Input
          className="max-w-24"
          label="อายุ ?"
          labelPlacement="outside"
          name="age"
          placeholder="ข้ามได้เหมือนกัน"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
        />
      </div>
      <Textarea
        isRequired
        label="ปัญหาที่ต้องการปรึกษา"
        labelPlacement="outside"
        name="message"
        placeholder="อธิบายปัญหาที่ต้องการปรึกษา จะพิมพ์ยาวแค่ไหนก็ได้เลยย :)"
        value={formik.values.message}
        onChange={formik.handleChange}
      />
      <Slider
        className="max-w-md"
        defaultValue={0}
        formatOptions={{ style: "decimal" }}
        label="ความรู้สึกที่มีต่อปัญหานี้"
        marks={marks}
        maxValue={5}
        minValue={1}
        showTooltip={true}
        step={1}
      />
      <p>
        1 = เฉยๆคิดว่าไม่กังวลมาก <br /> 2 = มีความกังวลเล็กน้อย <br /> 3 =
        กังวลและคิดถึงมันบ่อย <br /> 4 = เครียดและมีความเหนื่อย <br /> 5 =
        มีความเหนื่อยมากและกระทบกับสุขภาพจิต
      </p>
    </section>
  );
};

export default AdviceForm;
