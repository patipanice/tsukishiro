import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { collection, addDoc } from "firebase/firestore";

import { db } from "@/config/firebase";

export enum Mode {
  ADVICE = "advice",
  FEEDBACK = "feedback",
  SUGGESTION = "suggestion",
  OTHER = "other",
  TOPIC = "topic",
}

export interface InboxFormValues {
  name: string;
  age: number;
  message: string;
}

export const modeOptions = [
  { key: Mode.ADVICE, label: "ขอคำปรึกษา" },
  { key: Mode.TOPIC, label: "อยากให้พูดคุยในหัวข้อ" },
];

export const useInboxForm = () => {
  const [mode, setMode] = useState<Mode | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik: FormikProps<InboxFormValues> = useFormik<InboxFormValues>({
    initialValues: { name: "", age: 0, message: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const docRef = collection(db, "inbox");
        const res = await addDoc(docRef, {
          name: values.name,
          message: values.message,
          mode,
        });

        if (res.id) {
          resetForm();
          /* eslint-disable no-console */
          console.log("Document written with ID: ", res.id);
          alert(`ส่งข้อความเรียบร้อยแล้ว รหัส: ${res.id}`);
        }
      } catch (err) {
        /* eslint-disable no-console */
        console.error("Error adding document: ", err);
        setError("Failed to send message.");
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, mode, setMode, loading, error };
};
