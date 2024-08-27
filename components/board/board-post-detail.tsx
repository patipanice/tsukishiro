"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import AdviceForm from "@/components/form/advice-form";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { PostStatus, PostType } from "@/enums/post.enum";
import PostStatusSelect from "@/components/selects/post-status-select";
import { Button, Spinner } from "@nextui-org/react";
import { IAdviceForm } from "@/types";
import { useAuthContext } from "@/contexts/auth-context";
import { db } from "@/config/firebase";
import { formattedDate } from "@/components/post-it-card";
import { Snippet } from "@nextui-org/snippet";
import { Divider } from "@nextui-org/divider";
import { getCollectionNameByPostType } from "@/utils";
import { getCurrentBoardPathnameByType } from "./board";
import TopicForm from "../form/topic-form";
import { Role } from "@/enums/auth.enum";
import BoardPostComment from "./comment/board-post-comment";

export default function BoardPostDetail({
  params,
  type,
}: {
  params: { slug: string };
  type: PostType;
}) {
  const router = useRouter();
  const { user, role } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IAdviceForm | null>(null);
  const [refetch, setRefetch] = useState(false);

  const isUserPost = role === Role.MEMBER && user && user?.uid === data?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, getCollectionNameByPostType(type), params.slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (type === PostType.ADVICE) {
            formik.setFieldValue("feeling", data?.feeling || 1);
            formik.setFieldValue("period", data?.period || "");
          }
          //?basic information
          formik.setFieldValue("message", data?.message);
          formik.setFieldValue("age", String(data?.age));
          formik.setFieldValue("name", data?.name);
          formik.setFieldValue("gender", String(data?.gender));
          formik.setFieldValue("isPublish", data?.isPublish);
          formik.setFieldValue("status", data?.status || PostStatus.PENDING);
          formik.setFieldValue("createdAt", data?.createdAt);
          formik.setFieldValue("updatedAt", data?.updatedAt);
          formik.setFieldValue("userId", data?.userId);
          formik.setFieldValue("postColor", data?.postColor);
          setData(data as IAdviceForm);
          setLoading(false);
        }
      } catch (error: any) {
        alert(String(error?.message));
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [type, params, refetch]);

  const onRefetchHandler = () => setRefetch((prev) => !prev);

  // Function to update document status
  const updateStatusHandler = async (status: PostStatus) => {
    try {
      const docRef = doc(db, getCollectionNameByPostType(type), params.slug);
      await updateDoc(docRef, { status });
      formik.setFieldValue("status", status);
      alert("อัพเดทสำเร็จ");
      console.log("Document status updated to 'done'");
    } catch (error) {
      console.error("Error updating document status: ", error);
      alert("อัพเดทไมสำเร็จ");
    }
  };

  const updatePostHandler = async (values: IAdviceForm) => {
    try {
      let formValues: any = {
        message: values.message,
        name: values.name,
        age: values?.age,
        gender: values?.gender,
        isPublish: values.isPublish,
        postColor: values.postColor,
        updatedAt: serverTimestamp(),
      };

      if (type === PostType.ADVICE) {
        formValues = {
          ...formValues,
          feeling: values.feeling,
          period: values.period,
        };
      }

      const docRef = doc(db, getCollectionNameByPostType(type), params.slug);
      await updateDoc(docRef, formValues);
      alert("อัพเดทสำเร็จ");
      router.refresh();
      console.log("Document status updated to 'done'");
    } catch (error) {
      console.error("Error updating document status: ", error);
      alert("อัพเดทไมสำเร็จ");
    }
  };

  //?? Temporary function for add userId to post
  // const updateIsMyPost = async () => {
  //   try {
  //     const docRef = doc(db, getCollectionNameByPostType(type), params.slug);
  //     await updateDoc(docRef, { userId: user?.uid });
  //     alert("เพิ่มสำเร็จ");
  //     console.log("Document status updated to 'done'");
  //   } catch (error) {
  //     console.error("Error updating document status: ", error);
  //     alert("อัพเดทไมสำเร็จ");
  //   }
  // };

  async function deleteDocument(id: string) {
    try {
      // Get a reference to the document
      const docRef = doc(db, getCollectionNameByPostType(type), id);

      // Optionally, check if the document exists
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("ไม่พบโพสของคุณในระบบ");
      }

      // Delete the document
      await deleteDoc(docRef);
    } catch (error: any) {
      alert(String(error?.message));
      console.error("Error deleting document: ", error);
    }
  }

  const onClickDeletePostButtonHandler = async () => {
    if (window.confirm("ยืนยันการลบ")) {
      await deleteDocument(params.slug);
      alert("ลบสำเร็จ");
      router.push(getCurrentBoardPathnameByType(type));
    }
  };

  const canDeletePost = role === Role.SUPER_ADMIN || isUserPost;
  const canEditPost =
    (isUserPost && data?.status === PostStatus.PENDING) ||
    role === Role.SUPER_ADMIN;

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
    onSubmit: async (values) => {
      if (canEditPost) {
        updatePostHandler(values);
      }
    },
  });
  if (loading) return <Spinner />;

  return (
    <section className="w-full flex flex-col justify-center text-left -mt-[40px] gap-y-5 space-y-3">
      <Breadcrumbs>
        <BreadcrumbItem href={getCurrentBoardPathnameByType(type)}>
          {type === PostType.ADVICE ? "บอร์ดปัญหา" : "บอร์ดหัวข้อ"}
        </BreadcrumbItem>
        <BreadcrumbItem>รายละเอียดโพส</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-xl">
            รหัส{type === PostType.ADVICE ? "คำปรึกษา" : "หัวข้อ"}
          </p>
          <Snippet symbol="id:" size="sm">
            {params.slug}
          </Snippet>
          <div>
            <p className="text-xs">
              สถานะ :{" "}
              {formik.values.status === PostStatus.PENDING
                ? type === PostType.ADVICE
                  ? "ยังไม่ได้ให้คำปรึกษา"
                  : "ยังไม่ได้พูดคุย"
                : type === PostType.ADVICE
                ? "ให้คำปรึกษาแล้ว"
                : "พูดคุยแล้ว"}
            </p>
            <p className="text-xs">
              วันที่โพส :{" "}
              {formik.values.createdAt
                ? formattedDate(formik.values.createdAt)
                : null}
            </p>
            <p className="text-xs">
              วันที่อัพเดท :{" "}
              {formik.values.updatedAt
                ? formattedDate(formik.values.updatedAt)
                : null}
            </p>
          </div>
          {/* {user && (formik.values.userId === "" || !formik.values.userId) && (
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
          )} */}
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
              type={type}
            />
          )}
        </div>
      </div>
      <Divider />
      {type === PostType.ADVICE && (
        <AdviceForm isDetailPage formik={formik} canEditPost={canEditPost} />
      )}
      {type === PostType.TOPIC && (
        <TopicForm isDetailPage formik={formik} canEditPost={canEditPost} />
      )}
      <Divider/>
      <BoardPostComment postId={params.slug} comments={data?.comments} onRefetchHandler={onRefetchHandler}/>
    </section>
  );
}
