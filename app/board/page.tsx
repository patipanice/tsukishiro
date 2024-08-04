"use client";

import { title } from "@/components/primitives";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CircularProgress,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
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

// Function to generate random hex color
// Function to generate random hex color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Function to create solid color with opacity
  const getRandomColorWithOpacity = () => {
    const color = getRandomColor();
    const opacity = Math.random(); // Opacity between 0 and 1
    return `${color}${Math.round(opacity * 50).toString(16).padStart(2, '0')}`;
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
            <CircularProgress/>
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
                    style={{
                        background: getRandomColorWithOpacity(), // Apply random gradient background
                        color: '#fff', // Text color to ensure contrast
                      }}
                  >
                    <CardHeader className="flex gap-3">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 1024 1023"
                        >
                          <path
                            fill="red"
                            d="m896 800l128 223l-224-128l-1-6l-168-167l-152 151q-42 42-95-10V684L126 416l-13 12q-19 20-46.5 20t-47-19.5t-19.5-47T19 334L335 19q20-19 47.5-19t47 19T449 65.5T429 113l-13 13l269 258l179 1q52 52 9 94L722 630l168 168z"
                          />
                        </svg>
                      </div>
                    </CardHeader>
                    <CardBody className="p-3 text-sm text-default-500">
                      <p className="font-light text-gray-800">{item.message}</p>
                    </CardBody>
                    <CardFooter>
                      <p className="text-end font-light text-xs text-gray-500">
                        {item.name || "ไม่ระบุตัวตน"}
                      </p>
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
