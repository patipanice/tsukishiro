"use client";

import {
  Button,
  CircularProgress,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import PostItCard from "@/components/post-it-card";
import { IAdviceForm } from "@/types";

const filterOptions = [
  {
    key: "not_read",
    label: "ยังไม่ได้อ่าน",
  },
  {
    key: "read",
    label: "อ่านแล้ว",
  },
];

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
    router.push("/board" + "/" + id);
  };

  return (
    <section className="space-y-6">
      {/* <Select label="สถานะ" className="max-w-xs">
        {filterOptions.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select> */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>
          <p>{error}</p>
          <Button onClick={fetchData}>อีกครั้ง</Button>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
            data.map((item: IAdviceForm) => (
              <PostItCard
                item={item}
                onClickCardItemHandler={onClickCardItemHandler}
                key={item.id}
              />
            ))
          ) : (
            <p>ไม่พบข้อมูล</p>
          )}
        </div>
      )}
    </section>
  );
}
