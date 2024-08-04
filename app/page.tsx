"use client";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { useFormik } from "formik";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import AdviceForm from "@/components/form/advice-form";

enum EMode {
  "ADVICE" = "advice",
  "FEEDBACK" = "feedback",
  "SUGGESTION" = "suggestion",
  "OTHER" = "other",
  "TOPIC" = "topic",
}

const modeOptions = [
  {
    key: EMode.ADVICE,
    label: "ขอคำปรึกษา",
  },
  {
    key: EMode.TOPIC,
    label: "อยากให้พูดคุยในหัวข้อ",
  },
];

export default function Home() {
  const [mode, setMode] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: 0,
      message: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const docRef = collection(db, "inbox");
        const res = await addDoc(docRef, {
          name: values.name,
          message: values.message,
          mode: mode,
        });
        if (res.id) {
          formik.resetForm();
          console.log("Document written with ID: ", res.id);
          alert(`ส่งข้อความเรียบร้อยแล้ว รหัส: ${res.id}`);
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <section className="flex flex-col  justify-center gap-4 gap-y-6 py-8 md:py-10 text-left">
      <Select
        label="ต้องการ ?"
        className="max-w-xs"
        labelPlacement="outside"
        onChange={(e) => setMode(e.target.value)}
      >
        {modeOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
      {mode === EMode.ADVICE && <AdviceForm formik={formik} />}
      {mode !== undefined && (
        <Button
          color="primary"
          className="w-full xl:max-w-[200px]"
          onPress={(e) => {
            formik.handleSubmit();
          }}
          disabled={loading}
        >
          ส่งเลย
        </Button>
      )}
    </section>
  );
}
