"use client";

import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import AdviceForm from "@/components/form/advice-form";
import { PostStatus } from "@/enums/post.enum";
import PostStatusSelect from "@/components/selects/post-status-select";
import { IAdviceForm } from "@/types";
import { Spinner } from "@nextui-org/react";

export default function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
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
        formik.setFieldValue("status", data?.status || PostStatus.PENDING);
        formik.setFieldValue("createdAt", data?.createdAt?.toDate());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Function to update document status
  const updateStatusHandler = async (status: PostStatus) => {
    try {
      const docRef = doc(db, "inbox", params.slug);
      await updateDoc(docRef, { status });
      formik.setFieldValue("status", status);
      console.log("Document status updated to 'done'");
    } catch (error) {
      console.error("Error updating document status: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik<IAdviceForm>({
    initialValues: {
      id: "",
      message: "",
      feeling: 1,
      period: 0,
      age: 0,
      name: "",
      gender: 0,
      isPublish: false,
      status: PostStatus.PENDING,
      createdAt: new Date(),
    },
    onSubmit: async (values) => {},
  });

  if (loading) return <Spinner />;

  return (
    <section className="w-full flex flex-col items-center justify-items-center  justify-center text-left h-full -mt-[40px] gap-y-5">
      <div className="w-full flex justify-between">
        <div>
          <p className="text-xl">รหัสคำปรึกษา: {params.slug.substring(0, 5)}</p>
          <p className="text-sm">
            วันที่ติดปัญหาลงบอร์ด:{" "}
            {formik.values.createdAt
              ? formik.values.createdAt.toLocaleDateString()
              : ""}
          </p>
        </div>
        <PostStatusSelect
          value={formik.values.status as PostStatus}
          onChange={updateStatusHandler}
        />
      </div>
      <AdviceForm formik={formik} isDetailPage />
    </section>
  );
}
