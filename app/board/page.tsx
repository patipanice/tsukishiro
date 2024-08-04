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
import { useRouter } from "next/navigation";

enum EMode {
  "ADVICE" = "advice",
  "FEEDBACK" = "feedback",
  "SUGGESTION" = "suggestion",
  "OTHER" = "other",
  "TOPIC" = "topic",
}

const modeToLabel = (mode: any) => {
  switch (mode) {
    case EMode.ADVICE:
      return "ขอคำปรึกษา";
    case EMode.TOPIC:
      return "ต้องการให้พูดในหัวข้อ";
  }
};

export default function BoardPage() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "inbox"));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(dataArray);
      setData(dataArray.filter((item: any) => item?.isPublish));
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

  const onClickCardItemHandler = (id: string) => {
    console.log(id);
    router.push("/board" + "/" + id);
  };

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
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.length > 0 ? (
                data.map((item: any) => (
                  <Card
                    isPressable
                    className="w-full cursor-pointer"
                    key={item.id}
                    onPress={() => {
                      onClickCardItemHandler(item.id);
                    }}
                  >
                    <CardHeader className="flex gap-3">
                      {/* <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                      /> */}
                      <div className="flex flex-col">
                        <p className="text-2xl font-semibold">
                          {modeToLabel(item.mode) || "ขอคำปรึกษา"}
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-3 py-2 text-small text-default-400">
                      <p>{item.message}</p>
                    </CardBody>
                    <Divider />
                    {/* <CardFooter>
                      <Link isExternal showAnchorIcon>
                        แสดงความคิดเห็น
                      </Link>
                    </CardFooter> */}
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
