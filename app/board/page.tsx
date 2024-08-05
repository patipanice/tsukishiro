"use client";

import {
  Button,
  CircularProgress,
  Input,
  Kbd,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import PostItCard from "@/components/post-it-card";
import { IAdviceForm } from "@/types";
import { SearchIcon } from "@/components/icons";
import PostStatusSelect from "@/components/selects/post-status-select";
import { PostStatus } from "@/enums/post.enum";

export default function BoardPage() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<PostStatus | string>("");
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
      const matchesSearchValue =
        searchValue === "" ||
        item?.id?.toLowerCase().includes(searchValue.toLowerCase());

      const matchesStatus = status === "" || item?.status === status;

      return matchesSearchValue && matchesStatus;
    });
  }, [searchValue, data, status]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center w-full">
        <Input
          isClearable
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:max-w-52"
          aria-label="Search"
          label="ค้นหาด้วยรหัส"
          size="sm"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
              K
            </Kbd>
          }
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />
        <PostStatusSelect
          isFilter
          value={status}
          onChange={(status) => {
            setStatus(status);
          }}
        />
      </div>
      {loading ? (
        <div className="w-full min-h-[400px] flex justify-center items-center justify-items-center">
          <Spinner label="กำลังโหลด..." color="primary" labelColor="primary" />
        </div>
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
