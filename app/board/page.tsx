"use client";

import { title } from "@/components/primitives";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Mode } from "../page";

const modeToLabel = (mode: Mode) => {
  switch (mode) {
    case Mode.ADVICE:
      return "ขอคำปรึกษา";
    case Mode.TOPIC:
      return "ต้องการให้พูดในหัวข้อ";
  }
};

export default function BoardPage() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section className="w-full h-full">
      <h1 className={title()}>
        <div>
          {loading ? (
            <p>โหลดข้อมูล...</p>
          ) : error ? (
            <div>
              <p>{error}</p>
              <Button onClick={fetchData}>อีกครั้ง</Button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-4 gap-6">
              {data.length > 0 ? (
                data.map((item) => (
                  <Card className="max-w-[400px]" key={item.id}>
                    <CardHeader className="flex gap-3">
                      {/* <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                      /> */}
                      <div className="flex flex-col">
                        <p className="text-2xl">
                          {modeToLabel(item.mode) || "ขอคำปรึกษา"}
                        </p>
                        <p className="text-small text-default-500">
                          {item.name || "ไม่ระบุตัวตน"}
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <p className="text-base">{item.message}</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <Link isExternal showAnchorIcon>
                        แสดงความคิดเห็น
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p>ไม่พบข้อมูล</p>
              )}
            </div>
          )}
        </div>
      </h1>
    </section>
  );
}
