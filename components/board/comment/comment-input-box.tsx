import { Avatar, Button, Checkbox, Textarea } from "@heroui/react";
import { User } from "firebase/auth";
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
        showFallback
        className="flex-none"
        src={isAnonymous ? undefined : user?.photoURL || ""}
      />
      <div className="w-full space-y-2">
        <Textarea
          isDisabled={!user}
          name="message"
          placeholder={user ?"แสดงความคิดเห็น...": "เข้าสู่ระบบเพื่อแสดงความคิดเห็น"}
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <div className="float-right flex gap-4">
          <Checkbox
            checked={formik.values.isAnonymous}
            isDisabled={!user}
            name="isAnonymous"
            size="sm"
            onChange={formik.handleChange}
          >
            <span className="text-xs md:text-sm">
              แสดงความคิดเห็นแบบไม่ระบุตัวตัน
            </span>
          </Checkbox>
          <Button
            color="primary"
            isDisabled={formik.values.message === "" && !user}
            size="sm"
            onClick={() => formik.handleSubmit()}
          >
            ส่ง
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInputBox;
