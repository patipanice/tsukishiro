"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { useState, useEffect } from "react";
import { HeartIcon } from "./HeartIcon";
import { useFormik } from "formik";
import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

enum Mode {
  "ADVICE" = "advice",
  "FEEDBACK" = "feedback",
  "SUGGESTION" = "suggestion",
  "OTHER" = "other",
}

const modeOptions = [
  {
    key: Mode.ADVICE,
    label: "ขอคำปรึกษา",
  },
  {
    key: Mode.OTHER,
    label: "อื่นๆ",
  },
];

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "inbox"));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      mode: Mode.ADVICE,
      name: "",
      age: 0,
      message: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const docRef = collection(db, "inbox");
        const res = await addDoc(docRef, {
          name: values.name,
          message: values.message,
        });
        if (res.id) {
          setId(res.id);
          formik.resetForm();
          fetchData(); // Refetch data after submission
          console.log("Document written with ID: ", res.id);
          alert(`ส่งข้อความเรียบร้อยแล้ว รหัส: ${res.id}`);
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <section className="flex flex-col  justify-center gap-4 gap-y-6 py-8 md:py-10 text-left">
      {/* <div>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <div>
            <p>{error}</p>
            <Button onClick={fetchData}>Retry</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="bg-slate-400">
                  <p>ชื่อ: {item.name}</p>
                  <p>ข้อความ: {item.message}</p>
                </div>
              ))
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </div>
        )}
      </div> */}
      <Select label="ต้องการ ?" className="max-w-xs" labelPlacement="outside">
        {modeOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
      <Input
        label="คุณคือใคร ?"
        labelPlacement="outside"
        placeholder="ถ้าไม่ต้องการระบุชื่อผู้ส่งข้ามไปได้เลยย"
        type="text"
        isClearable
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <Textarea
        isRequired
        label="ปัญหาที่ต้องการปรึกษา ?"
        labelPlacement="outside"
        placeholder="อธิบายปัญหาที่ต้องการปรึกษา จะพิมพ์ยาวแค่ไหนก็ได้เลยย :)"
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
      />
      <Button
        color="primary"
        className="w-full xl:max-w-[200px]"
        onPress={(e) => {
          formik.handleSubmit();
        }}
        disabled={loading}
        isLoading={loading}
      >
        ส่งเลย
      </Button>
    </section>
  );
}
