"use client";

import { Button, Input, Kbd, Spinner } from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { SearchIcon } from "@/components/icons";
import PostStatusSelect from "@/components/selects/post-status-select";
import { PostPublishStatus, PostStatus, PostType } from "@/enums/post.enum";
import PostPublishSelect from "@/components/selects/post-publish-select";
import { useAuthContext } from "@/contexts/auth-context";
import { getCollectionRef } from "@/utils/firebase-util";
import BoardPosts from "@/components/board/board-posts";
import PostTypeSelect from "@/components/selects/post-type-select";
import { getCollectionNameByPostType } from "@/utils";
import { getCurrentBoardPathnameByType } from "@/components/board/board";

interface IFilterValue {
  search?: string;
  status?: PostStatus;
  type: PostType;
  isPublish?: PostPublishStatus;
}

// Helper function to check if a field contains the search value
const fieldMatchesSearch = (fieldValue: string, searchValue?: string) => {
  return (
    searchValue === undefined ||
    fieldValue.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const fetchPost = async (
  type: PostType,
  filterValue: IFilterValue,
  userId?: string
) => {
  try {
    let queryRef = query(getCollectionRef(getCollectionNameByPostType(type)));

    if (userId) {
      queryRef = query(queryRef, where("userId", "==", userId));
    }

    if (filterValue.status) {
      queryRef = query(queryRef, where("status", "==", filterValue.status));
    }

    if (filterValue.isPublish) {
      queryRef = query(
        queryRef,
        where(
          "isPublish",
          "==",
          filterValue.isPublish === PostPublishStatus.PUBLISH ? true : false
        )
      );
    }

    // Fetch the documents
    const querySnapshot = await getDocs(queryRef);

    // Map the documents to an array
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return dataArray;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default function BoardPage() {
  const { user } = useAuthContext();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<IFilterValue>({
    search: undefined,
    status: undefined,
    type: PostType.ADVICE,
    isPublish: PostPublishStatus.PUBLISH,
  });

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await fetchPost(filterValue.type, filterValue, user?.uid);

        setData(posts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [
    filterValue.search,
    filterValue.status,
    filterValue.isPublish,
    filterValue.type,
    user?.uid,
  ]);

  const onClickCardItemHandler = (id: string) => {
    router.push(getCurrentBoardPathnameByType(filterValue.type) + "/" + id);
  };

  const boardItemData = useMemo(() => {
    const searchValue = filterValue.search || "";

    return data?.filter((item: { id: any; name: any }) => {
      const idMatches = fieldMatchesSearch(item?.id || "", searchValue);
      const nameMatches = fieldMatchesSearch(item?.name || "", searchValue);

      return idMatches || nameMatches;
    });
  }, [data, filterValue.search]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center w-full">
        <Input
          isClearable
          aria-label="Search"
          className="w-full md:max-w-52"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
              K
            </Kbd>
          }
          label="ค้นหาด้วยรหัสหรือชื่อ"
          size="sm"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          onChange={(e) => {
            setFilterValue((prev) => ({
              ...prev,
              search: e.target.value,
            }));
          }}
        />
        <PostTypeSelect
          isFilter
          value={filterValue.type}
          onChange={(type) => {
            setFilterValue((prev) => ({
              ...prev,
              type,
            }));
          }}
        />
        <PostStatusSelect
          isFilter
          type={filterValue.type}
          value={filterValue.status}
          onChange={(status) => {
            setFilterValue((prev) => ({
              ...prev,
              status,
            }));
          }}
        />
        {user && (
          <PostPublishSelect
            isFilter
            value={filterValue.isPublish}
            onChange={(isPublish) => {
              setFilterValue((prev) => ({
                ...prev,
                isPublish: isPublish as PostPublishStatus,
              }));
            }}
          />
        )}
      </div>
      {loading ? (
        <div className="w-full min-h-[400px] flex justify-center items-center justify-items-center">
          <Spinner color="primary" label="กำลังโหลด..." labelColor="primary" />
        </div>
      ) : error ? (
        <div>
          <p>{error}</p>
          <Button onClick={() => fetchPost(filterValue.type, filterValue, user?.uid)}>
            อีกครั้ง
          </Button>
        </div>
      ) : (
        <BoardPosts
          data={boardItemData}
          userId={user?.uid}
          onClickCardItemHandler={onClickCardItemHandler}
        />
      )}
    </section>
  );
}
