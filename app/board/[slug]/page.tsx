"use client";
import { useEffect } from "react";
import { db } from "../../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useFormik } from "formik";
import AdviceForm from "@/components/form/advice-form";

export default function Page({ params }: { params: { slug: string } }) {
  const fetchData = async () => {
    try {
      const docRef = doc(db, "inbox", params.slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        formik.setFieldValue("message", data?.message);
        formik.setFieldValue("feeling", data?.feeling);
        formik.setFieldValue("period", data?.period);
        formik.setFieldValue("age", String(data?.age));
        formik.setFieldValue("name", data?.name);
        formik.setFieldValue("gender", String(data?.gender));
        formik.setFieldValue("isPublish", data?.isPublish);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      message: "",
      feeling: 1,
      period: "",
      age: "",
      name: "",
      gender: undefined,
      isPublish: false,
    },
    onSubmit: async (values) => {},
  });

  console.log(formik.values)

  return (
    <section className="flex flex-col items-center justify-items-center  justify-center text-left h-full -mt-[40px] gap-y-5">
      <p className="text-xl">id: {params.slug.substring(0, 5)}</p>
      <AdviceForm formik={formik} isDetailPage />
    </section>
  );
}
