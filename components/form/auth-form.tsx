import React from "react";
import NextLink from "next/link";
import { FormikProps } from "formik";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { AuthFormValue } from "@/types/auth";
import { AuthMode } from "../auth-page";

interface IAuthFormProps {
  formik: FormikProps<AuthFormValue>;
  authMode: AuthMode;
}

const AuthForm: React.FC<IAuthFormProps> = ({ formik, authMode }) => {
  return (
    <div className="w-full flex flex-col gap-7">
      <div>
        <h1 className="text-xl font-medium ">
          {authMode === AuthMode.SIGN_UP
            ? "สร้างผู้ใช้งานของคุณ"
            : "เข้าสู่ระบบ"}
        </h1>
        {authMode === AuthMode.SIGN_UP && (
          <p className="text-xs text-gray-500">
            เพื่อความเป็นส่วนตัว ให้ใช้อีเมลที่ไม่สามารถระบุตัวตนผู้ใช้งานได้
          </p>
        )}
      </div>
      <Input
        label="อีเมล"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        labelPlacement="outside"
        placeholder={
          authMode === AuthMode.SIGN_UP
            ? "กรุณากรอกอีเมลให้ถูกต้อง ex. email@email.com"
            : "กรุณากรอกอีเมล"
        }
      />
      <Input
        label="รหัสผ่าน"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        labelPlacement="outside"
        placeholder="กรุณากรอกความยาวขั้นต่ำ 6 ตัวอักษร"
      />
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        color="primary"
      >
        {authMode === AuthMode.SIGN_IN ? "เข้าสู่ระบบ" : "สร้างผู้ใช้งาน"}
      </Button>
      {authMode === AuthMode.SIGN_IN && (
        <p className="text-xs">
          ยังไม่มีสมาชิกใช่ไหม?{" "}
          <NextLink href="/signup">
            <span className="text-blue-500">ไปหน้าสร้างสมาชิก</span>
          </NextLink>
        </p>
      )}
      {authMode === AuthMode.SIGN_UP && (
        <NextLink href="/signin">
          <span className="text-blue-500 text-xs">ไปหน้าเข้าสู่ระบบ</span>
        </NextLink>
      )}
    </div>
  );
};

export default AuthForm;
