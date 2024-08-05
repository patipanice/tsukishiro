"use client";

import {
  Button,
  CircularProgress,
  Input,
  Kbd,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import PostItCard from "@/components/post-it-card";
import { IAdviceForm } from "@/types";
import { SearchIcon } from "@/components/icons";

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
  const [searchValue, setSearchValue] = useState<string>("");
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

  const boardItemData = useMemo(() => {
    return data.filter((item: any) => {
      if (searchValue === "") {
        return item;
      } else {
        return item?.id?.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
  }, [searchValue, data]);

  return (
    <section className="space-y-6">
      {/* <Select label="สถานะ" className="max-w-xs">
        {filterOptions.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select> */}
      <Input
        isClearable
        onChange={(e) => setSearchValue(e.target.value)}
        className="max-w-xs"
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="ค้นหาด้วยรหัส"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>
          <p>{error}</p>
          <Button onClick={fetchData}>อีกครั้ง</Button>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boardItemData.length > 0 ? (
            boardItemData.map((item: IAdviceForm) => (
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
