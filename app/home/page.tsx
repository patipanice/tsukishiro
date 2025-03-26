"use client";

import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { useFormik } from "formik";
import { addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { Link } from "@heroui/link";
import { User as FirebaseUser, User } from "firebase/auth";

import { getQuotes } from "./action";

import AdviceForm from "@/components/form/advice-form";
import { SadButRelievedFace } from "@/components/icons/SadButRelievedFace";
import { Topic } from "@/components/icons/Topic";
import { PostStatus, PostType } from "@/enums/post.enum";
import { getCollectionRef } from "@/utils/firebase-util";
import BlockQuote from "@/components/block-quote";
import { PinIcon } from "@/components/icons/PinIcon";
import { useAuthContext } from "@/contexts/auth-context";
import { collectionName } from "@/config/firebase";
import TopicForm from "@/components/form/topic-form";
import { IAdviceForm, QAFormValues, TopicFormValues } from "@/types";
import { BackIcon } from "@/components/icons/BackIcon";
import { AskubuntuIcon } from "@/components/icons/AskIcon";
import QAForm from "@/components/form/qa-form";
import { postBackgroundColor } from "@/config/constants";

enum Step {
  SELECT_TYPE = 1,
  SELECTED_TYPE = 2,
  SHOW_QUOTE = 3,
}

const modeOptions = [
  {
    key: PostType.ADVICE,
    label: "ขอคำปรึกษา",
    icon: <SadButRelievedFace />,
    disabled: false,
  },
  {
    key: PostType.TOPIC,
    label: "อยากให้พูดคุยในหัวข้อ",
    icon: <Topic />,
    disabled: false,
  },
  {
    key: PostType.QA,
    label: "ถามคำถาม Q&A",
    icon: <AskubuntuIcon />,
    disabled: false,
  },
];

const getFormInitialValues = (postType: PostType | null, user: User | null) => {
  if (!postType) return {};
  let values = {};

  switch (postType) {
    case PostType.ADVICE:
      values = {
        message: "",
        feeling: 1,
        period: "",
        age: "",
        name: user?.displayName,
        gender: undefined,
        isPublish: true,
        postColor: postBackgroundColor[0],
      };
      break;
    case PostType.TOPIC:
      values = {
        message: "",
        age: "",
        name: user?.displayName,
        gender: undefined,
        isPublish: true,
        postColor: postBackgroundColor[0],
      };
      break;
    case PostType.QA:
      values = {
        message: "",
        age: "",
        name: user?.displayName,
        gender: undefined,
        isPublish: true,
        postColor: postBackgroundColor[0],
      };
      break;
  }

  return values;
};

const submitAdviceForm = async (
  values: IAdviceForm,
  user: FirebaseUser | null
) => {
  const docRef = getCollectionRef(collectionName.advice);
  const res = await addDoc(docRef, {
    ...values,
    userId: user?.uid || "",
    age: Number(values?.age),
    gender: Number(values?.gender),
    status: PostStatus.PENDING,
    postType: PostType.ADVICE,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (!res.id) {
    throw new Error("สร้างโพสไม่สำเร็จ โปรดลองอีกครั้ง");
  }
  const responseGetQuotes = await getQuotes();

  return {
    postId: res.id,
    quote: responseGetQuotes?.length > 0 ? responseGetQuotes[0] : "", // todo: default quotes
  };
};

const submitTopicForm = async (
  values: TopicFormValues,
  user: FirebaseUser | null
) => {
  const docRef = getCollectionRef(collectionName.topic);
  const res = await addDoc(docRef, {
    ...values,
    userId: user?.uid || "",
    age: Number(values?.age),
    gender: Number(values?.gender),
    status: PostStatus.PENDING,
    postType: PostType.TOPIC,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (!res.id) {
    throw new Error("สร้างโพสไม่สำเร็จ โปรดลองอีกครั้ง");
  }
  const responseGetQuotes = await getQuotes();

  return {
    postId: res.id,
    quote: responseGetQuotes?.length > 0 ? responseGetQuotes[0] : "", // todo: default quotes
  };
};

const submitQAForm = async (
  values: QAFormValues,
  user: FirebaseUser | null
) => {
  const docRef = getCollectionRef(collectionName.qa);
  const res = await addDoc(docRef, {
    ...values,
    userId: user?.uid || "",
    age: Number(values?.age),
    gender: Number(values?.gender),
    status: PostStatus.PENDING,
    postType: PostType.QA,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (!res.id) {
    throw new Error("สร้างโพสไม่สำเร็จ โปรดลองอีกครั้ง");
  }
  const responseGetQuotes = await getQuotes();

  return {
    postId: res.id,
    quote: responseGetQuotes?.length > 0 ? responseGetQuotes[0] : "",
  };
};

export default function Home() {
  const { user } = useAuthContext();
  const [postType, setPostType] = useState<PostType | null>(null);
  const [step, setStep] = useState<number>(Step.SELECT_TYPE);
  const [loading, setLoading] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | undefined>(undefined);
  const [quote, setQuote] = useState<any | undefined>(undefined);

  const formik = useFormik({
    initialValues: getFormInitialValues(postType, user),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { postId, quote } =
          postType === PostType.ADVICE
            ? await submitAdviceForm(values as IAdviceForm, user)
            : postType === PostType.QA
              ? await submitQAForm(values as QAFormValues, user)
              : await submitTopicForm(values as TopicFormValues, user);

        setPostId(postId);
        setQuote(quote);

        setLoading(false);
        formik.resetForm();
        setStep(Step.SHOW_QUOTE);
      } catch (error: any) {
        alert(String(error?.message));
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <section className="flex flex-col items-center justify-items-center justify-center text-left h-full -mt-[35px] gap-y-5">
      {step === Step.SELECT_TYPE && (
        <div className="flex flex-col items-center justify-items-center gap-y-5 w-full">
          <Select
            className="max-w-xl"
            label="คุณต้องการ"
            onChange={(e) => setPostType(e.target.value as PostType | null)}
          >
            {modeOptions.map((option) => (
              <SelectItem
                key={option.key}
                isReadOnly={option.disabled}
                startContent={option.icon}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            className="w-full max-w-xl "
            color="primary"
            endContent={
              <svg
                height="20"
                viewBox="0 0 1024 1024"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
                  fill="currentColor"
                />
              </svg>
            }
            isDisabled={!postType}
            variant="light"
            onClick={() => setStep(Step.SELECTED_TYPE)}
          >
            ขั้นตอนต่อไป
          </Button>
        </div>
      )}
      {step === Step.SELECTED_TYPE && (
        <Button
          className="self-start text-primary-500"
          size="lg"
          startContent={<BackIcon />}
          variant="light"
          onClick={() => {
            setStep(Step.SELECT_TYPE);
          }}
        >
          กลับ
        </Button>
      )}
      {step === Step.SELECTED_TYPE &&
        (postType === PostType.ADVICE ? (
          <AdviceForm formik={formik} isLoadingSubmit={loading} />
        ) : postType === PostType.TOPIC ? (
          <TopicForm formik={formik} isLoadingSubmit={loading} />
        ) : postType === PostType.QA ? (
          <QAForm formik={formik} isLoadingSubmit={loading} />
        ) : undefined)}
      {step === Step.SHOW_QUOTE &&
        postId !== undefined &&
        quote !== undefined && (
          <div className="flex flex-col w-full gap-y-14">
            <BlockQuote author={quote.author} id={postId} quote={quote.quote} />
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
