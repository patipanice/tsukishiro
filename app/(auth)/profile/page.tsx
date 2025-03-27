"use client";

import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthContext } from "@/contexts/auth-context";
import { auth, collectionName, db } from "@/config/firebase";
import ImageUpload from "@/components/image-upload";

type UserProfileFields = Partial<Pick<User, "displayName" | "photoURL">>;

const updateUserProfileFirebaseAuth = async (
  uid: string,
  fields: UserProfileFields
) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, { ...fields });
      await updateUserProfileFireStore(uid, { ...fields });
      alert("อัพเดทเสร็จสิ้น");
    } catch (error) {
      alert("เกิดข้อผิดพลาด");
    }
  }
};

const updateUserProfileFireStore = async (
  uid: string,
  fields: UserProfileFields
) => {
  try {
    const docRef = doc(db, collectionName.users, uid);

    await updateDoc(docRef, {
      fields,
    });

    return { status: 200 };
  } catch (error) {
    alert(error);
  }
};

export default function BoardPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [displayNameValue, setDisplayNameValue] = useState(
    user?.displayName || ""
  );

  const refreshRoute = () => router.refresh();

  return (
    <section className="flex flex-col gap-7 justify-center items-center w-full">
      <ImageUpload refreshRoute={refreshRoute} user={user} />
      <div className="w-full flex flex-col items-center gap-y-6">
        <Input isReadOnly className="max-w-xs" label="uid" value={user?.uid} />
        <Input
          isReadOnly
          className="max-w-xs"
          label="อีเมล"
          value={user?.email || ""}
        />
        <Input
          className="max-w-xs"
          defaultValue={user?.displayName || ""}
          label="ชื่อที่แสดง"
          placeholder="ชื่อนี้ผู้ใช้สามารถเลือกที่จะแสดงในโพสได้"
          value={displayNameValue}
          onChange={(e) => {
            setDisplayNameValue(e.target.value);
          }}
        />
        <Button
          color="primary"
          onClick={() =>
            updateUserProfileFirebaseAuth(String(user?.uid), {
              displayName: displayNameValue,
            }).then(() => {
              refreshRoute();
            })
          }
        >
          บันทึกชื่อที่แสดง
        </Button>
      </div>
    </section>
  );
}
