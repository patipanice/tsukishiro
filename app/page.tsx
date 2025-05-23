"use client";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";

import AdviceForm from "@/components/form/advice-form";
import { modeOptions, Mode, useInboxForm } from "@/hooks/useInboxForm";

export default function Home() {
  const { formik, mode, setMode, loading } = useInboxForm();

  return (
    <section className="flex flex-col  justify-center gap-4 gap-y-6 py-8 md:py-10 text-left">
      <Select
        className="max-w-xs"
        label="ต้องการ ?"
        labelPlacement="outside"
        onChange={(e) => setMode(e.target.value as Mode)}
      >
        {modeOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
      {mode === Mode.ADVICE && <AdviceForm formik={formik} />}
      {mode !== undefined && (
        <Button
          className="w-full xl:max-w-[200px]"
          color="primary"
          disabled={loading}
          onPress={(e) => {
            formik.handleSubmit();
          }}
        >
          ส่งเลย
        </Button>
      )}
    </section>
  );
}
