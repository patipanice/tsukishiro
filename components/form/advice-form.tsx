import { Input, Textarea } from "@nextui-org/input";
import { Slider } from "@nextui-org/react";
interface IAdviceFormProps {
  formik: any;
}
const AdviceForm: React.FC<IAdviceFormProps> = ({ formik }) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex gap-x-6">
        <Input
          label="คุณคือใคร"
          labelPlacement="outside"
          placeholder="ถ้าไม่ต้องการระบุชื่อผู้ส่งข้ามไปได้เลยย"
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Input
          label="อายุ ?"
          labelPlacement="outside"
          placeholder="ข้ามได้เหมือนกัน"
          type="number"
          name="age"
          onChange={formik.handleChange}
          value={formik.values.age}
          className="max-w-24"
        />
      </div>
      <Textarea
        isRequired
        label="ปัญหาที่ต้องการปรึกษา"
        labelPlacement="outside"
        placeholder="อธิบายปัญหาที่ต้องการปรึกษา จะพิมพ์ยาวแค่ไหนก็ได้เลยย :)"
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
      />
      <Slider
        label="ความรู้สึกที่มีต่อปัญหานี้"
        showTooltip={true}
        step={1}
        formatOptions={{ style: "decimal" }}
        maxValue={5}
        minValue={1}
        marks={[
          {
            value: 1,
            label: "1",
          },
          {
            value: 2,
            label: "2",
          },
          {
            value: 3,
            label: "3",
          },
          {
            value: 4,
            label: "4",
          },
          {
            value: 5,
            label: "5",
          },
        ]}
        defaultValue={0}
        className="max-w-md"
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
