"use client";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { db, app } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import AdviceForm, { colors } from "@/components/form/advice-form";
import { SadButRelievedFace } from "@/components/icons/SadButRelievedFace";
import { Topic } from "@/components/icons/Topic";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { PostStatus } from "@/enums/post.enum";

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
    icon: <SadButRelievedFace />,
    disabled: false
  },
  {
    key: EMode.TOPIC,
    label: "อยากให้พูดคุยในหัวข้อ",
    icon: <Topic />,
    disabled: true
  },
];

const getQuotes = async () => {
  const category = "happiness";
  const res = await fetch(
    "https://api.api-ninjas.com/v1/quotes?category=" + category,
    {
      headers: {
        "X-Api-Key": String(process.env.NEXT_PUBLIC_NINJA_API_KEY),
      },
    }
  );
  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
  // .then((res) => {
  //   if (res.length > 0) {
  //     setQuote(res[0]);
  //     setLoading(false);
  //     increaseStep();
  //     formik.resetForm();
  //   }
  // });
};

export default function Home() {
  const [mode, setMode] = useState<any | undefined>(undefined);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | undefined>(undefined);
  const [quote, setQuote] = useState<any | undefined>(undefined);

  const increaseStep = () => {
    setStep(step + 1);
  };

  const formik = useFormik({
    initialValues: {
      message: "",
      feeling: 1,
      period: "",
      age: "",
      name: "",
      gender: undefined,
      isPublish: true,
      postColor: colors[0]
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const docRef = collection(db, "inbox");
        const res = await addDoc(docRef, {
          ...values,
          age: Number(values.age),
          gender: Number(values.gender),
          status: PostStatus.PENDING,
          createdAt: serverTimestamp(),
        });
        if (res.id) {
          setId(res.id);
          const responseGetQuotes = await getQuotes();
          if (responseGetQuotes.length > 0) {
            setQuote(responseGetQuotes[0]);
            setLoading(false);
            increaseStep();
            formik.resetForm();
          }
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <section className="flex flex-col items-center justify-items-center  justify-center text-left h-full -mt-[40px] gap-y-5">
      {step === 1 && (
        <div className="flex flex-col items-center justify-items-center gap-y-5 w-full">
          <Select
            label="คุณต้องการ"
            className="max-w-xl"
            onChange={(e) => setMode(e.target.value)}
          >
            {modeOptions.map((option) => (
              <SelectItem startContent={option.icon} key={option.key} isReadOnly={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            color="primary"
            className="w-full max-w-xl "
            onClick={() => increaseStep()}
            isDisabled={!mode}
            variant="light"
            endContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
                />
              </svg>
            }
          >
            ขั้นตอนต่อไป
          </Button>
        </div>
      )}
      {step === 2 && <AdviceForm formik={formik} />}
      {step === 3 && id !== undefined && quote !== undefined && (
        <blockquote className="text-center font-mono font-light">
          <p className="text-lg">{quote?.quote}</p>
          <footer className="text-sm mt-3 text-gray-500">
            - {quote?.author}
          </footer>
          <footer className="text-xs mt-3 text-right text-gray-400">
            id : {id.substring(0, 5)}
          </footer>
        </blockquote>
      )}
    </section>
  );
}
