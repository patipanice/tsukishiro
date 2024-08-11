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
import { Role, useAuthContext } from "@/contexts/auth-context";
import { db } from "@/config/firebase";
import { formattedDate } from "@/components/post-it-card";

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
  const { user, role } = useAuthContext();
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
        formik.setFieldValue("createdAt", data?.createdAt);
        formik.setFieldValue("userId", data?.userId);
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
      alert("อัพเดทสำเร็จ");
      console.log("Document status updated to 'done'");
    } catch (error) {
      console.error("Error updating document status: ", error);
      alert("อัพเดทไมสำเร็จ");
    }
  };

  //?? Temporary function for add userId to post
  const updateIsMyPost = async () => {
    try {
      const docRef = doc(db, "inbox", params.slug);
      await updateDoc(docRef, { userId: user?.uid });
      alert("เพิ่มสำเร็จ");
      console.log("Document status updated to 'done'");
    } catch (error) {
      console.error("Error updating document status: ", error);
      alert("อัพเดทไมสำเร็จ");
    }
  };

  const onClickDeletePostButtonHandler = async () => {
    if (window.confirm("ยืนยันการลบ")) {
      await deleteDocument(params.slug);
      alert("ลบสำเร็จ");
      router.push("/board-advice");
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
      postColor: "",
      userId: undefined,
    },
    onSubmit: async () => {},
  });

  const canDeletePost =
    role === Role.SUPER_ADMIN ||
    (role === Role.MEMBER && user?.uid === formik.values.userId);

  if (loading) return <Spinner />;

  return (
    <section className="w-full flex flex-col justify-center text-left -mt-[40px] gap-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl">รหัสคำปรึกษา: {params.slug.substring(0, 5)}</p>
          <p className="text-sm">
            วันที่ติดปัญหาลงบอร์ด:{" "}
            {formik.values.createdAt
              ? formattedDate(formik.values.createdAt)
              : "-"}
          </p>
          {user && (formik.values.userId === "" || !formik.values.userId) && (
            <div>
              <Button
                onClick={updateIsMyPost}
                className="mt-5"
                color="secondary"
              >
                เพิ่มเข้าโพสของฉัน
              </Button>
              <p className="text-xs text-gray-500 pt-1">
                (ระบบจะทำการเพิ่มโพสนี้เป็นโพสของคุณ
                และจะไปแสดงที่หน้าบอร์ดของฉัน)
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ">
          {canDeletePost && (
            <Button
              onClick={onClickDeletePostButtonHandler}
              color="danger"
              variant="ghost"
            >
              ลบ
            </Button>
          )}
          {role === Role.SUPER_ADMIN && (
            <PostStatusSelect
              value={formik.values.status as PostStatus}
              onChange={updateStatusHandler}
            />
          )}
        </div>
      </div>
      <AdviceForm isDetailPage formik={formik} />
    </section>
  );
}
