"use client";

import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormik } from "formik";
export default function SignUpPage() {
  const { login } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      try {
        await login(values.email, values.password);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <section className="space-y-6">
      <Input
        label="อีเมล"
        type="email"
        onChange={formik.handleChange}
        name="email"
      />
      <Input
        label="รหัสผ่าน"
        type="password"
        onChange={formik.handleChange}
        name="password"
      />
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        color="primary"
      >
        เข้าสู่ระบบ
      </Button>
    </section>
  );
}
