"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";
import { auth } from "@/config/firebase";
import ImageUpload from "@/components/image-upload";
import { updateProfile } from "firebase/auth";

const updateUserDisplayName = async (displayNameValue: string) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, { displayName: displayNameValue });
      alert("อัพเดทเสร็จสิ้น");
    } catch (error) {
      alert("เกิดข้อผิดพลาด");
    }
  }
};
export default function BoardPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [displayNameValue, setDisplayNameValue] = useState(
    user?.displayName || ""
  );

  const refreshRoute = () => router.refresh()

  return (
    <section className="flex flex-col gap-7 justify-center items-center w-full">
      <ImageUpload user={user} refreshRoute={refreshRoute}/>
      <div className="w-full flex flex-col items-center gap-y-6">
        <Input label="uid" isReadOnly value={user?.uid} className="max-w-xs" />
        <Input
          label="อีเมล"
          isReadOnly
          value={user?.email || ""}
          className="max-w-xs"
        />
        <Input
          label="ชื่อที่แสดง"
          className="max-w-xs"
          defaultValue={user?.displayName || ""}
          value={displayNameValue}
          placeholder="ชื่อนี้ผู้ใช้สามารถเลือกที่จะแสดงในโพสได้"
          onChange={(e) => {
            setDisplayNameValue(e.target.value);
          }}
        />
        <Button
          onClick={() =>
            updateUserDisplayName(displayNameValue).then(() => {
              refreshRoute()
            })
          }
          color="primary"
        >
          บันทึกชื่อที่แสดง
        </Button>
      </div>
    </section>
  );
}
