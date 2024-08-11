"use client";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addDoc } from "firebase/firestore";
import AdviceForm, { colors } from "@/components/form/advice-form";
import { SadButRelievedFace } from "@/components/icons/SadButRelievedFace";
import { Topic } from "@/components/icons/Topic";
import { serverTimestamp } from "firebase/firestore";
import { PostStatus } from "@/enums/post.enum";
import { getCollectionRef } from "@/utils/filebase-util";
import BlockQuote from "@/components/block-quote";
import { Link } from "@nextui-org/link";
import { PinIcon } from "@/components/icons/PinIcon";
import { useAuthContext } from "@/contexts/auth-context";
import { collectionName } from "@/config/firebase";
import { getQuotes } from "./action";

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
    disabled: false,
  },
  {
    key: EMode.TOPIC,
    label: "อยากให้พูดคุยในหัวข้อ",
    icon: <Topic />,
    disabled: true,
  },
];

export default function Home() {
  const { user } = useAuthContext();
  const [mode, setMode] = useState<any | undefined>(undefined);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
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
      postColor: colors[0],
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const docRef = getCollectionRef(collectionName.advice);
        const res = await addDoc(docRef, {
          ...values,
          userId: user?.uid || "", // if user is auth send userId : send empty string
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
      } catch (error: any) {
        alert(String(error?.message));
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
              <SelectItem
                startContent={option.icon}
                key={option.key}
                isReadOnly={option.disabled}
              >
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
      {step === 2 && <AdviceForm formik={formik} isLoadingSubmit={loading} />}
      {step === 3 && id !== undefined && quote !== undefined && (
        <div className="flex flex-col w-full gap-y-14">
          <BlockQuote quote={quote.quote} author={quote.author} id={id} />
          <div className="">
            <Link href="/board-advice">
              <p className="text-sm text-secondary-500 flex gap-2 items-center">
                <PinIcon />
                ไปดูบอร์ด
              </p>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
