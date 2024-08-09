"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import AdviceForm from "@/components/form/advice-form";
import { PostStatus } from "@/enums/post.enum";
import PostStatusSelect from "@/components/selects/post-status-select";
import { Button, Spinner } from "@nextui-org/react";
import { IAdviceForm } from "@/types";
import { useAuthContext } from "@/contexts/auth-context";
import { db } from "@/config/firebase";

async function deleteDocument(id: string) {
  try {
    // Get a reference to the document
    const docRef = doc(db, "inbox", id);

    // Optionally, check if the document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }

    // Delete the document
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "inbox", params.slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
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

  const onClickDeletePostButtonHandler = async () => {
    await deleteDocument(params.slug);
    alert("ลบสำเร็จ");
    router.push("/board");
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
      postColor: "",
    },
    onSubmit: async () => {},
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
        {user && (
          <div className="flex flex-col gap-2 max-w-72">
            <PostStatusSelect
              value={formik.values.status as PostStatus}
              onChange={updateStatusHandler}
            />
            <Button size="sm" onClick={onClickDeletePostButtonHandler}>
              ลบ
            </Button>
          </div>
         )} 
      </div>
      <AdviceForm isDetailPage formik={formik} />
    </section>
  );
}
