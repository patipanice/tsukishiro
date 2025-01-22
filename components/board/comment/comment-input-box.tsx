import { Avatar, Button, Checkbox, Textarea } from "@heroui/react";
import { User } from "firebase/auth";
import { FormikProps, FormikValues } from "formik";
import React from "react";

//TODO: type for props
interface CommentInputBoxProps {
  formik: any;
  user: User | null;
}

const CommentInputBox: React.FC<CommentInputBoxProps> = ({ formik, user }) => {
  const isAnonymous = formik.values.isAnonymous;
  return (
    <div className="flex gap-3">
      <Avatar
        className="flex-none"
        src={isAnonymous ? undefined : user?.photoURL || ""}
        showFallback
      />
      <div className="w-full space-y-2">
        <Textarea
          name="message"
          placeholder={user ?"แสดงความคิดเห็น...": "เข้าสู่ระบบเพื่อแสดงความคิดเห็น"}
          value={formik.values.message}
          onChange={formik.handleChange}
          isDisabled={!user}
        />
        <div className="float-right flex gap-4">
          <Checkbox
            name="isAnonymous"
            checked={formik.values.isAnonymous}
            onChange={formik.handleChange}
            size="sm"
            isDisabled={!user}
          >
            <span className="text-xs md:text-sm">
              แสดงความคิดเห็นแบบไม่ระบุตัวตัน
            </span>
          </Checkbox>
          <Button
            size="sm"
            color="primary"
            onClick={() => formik.handleSubmit()}
            isDisabled={formik.values.message === "" && !user}
          >
            ส่ง
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInputBox;
