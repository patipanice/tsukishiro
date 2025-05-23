"use client";

import { Button, Input, Spinner } from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

import PostSortingDate from "../selects/post-sorting-date-select";

import BoardPosts from "./board-posts";

import { SearchIcon } from "@/components/icons";
import PostStatusSelect from "@/components/selects/post-status-select";
import {
  OrderBy,
  PostPublishStatus,
  PostStatus,
  PostType,
} from "@/enums/post.enum";
import PostPublishSelect from "@/components/selects/post-publish-select";
import { useAuthContext } from "@/contexts/auth-context";
import { getCollectionRef } from "@/utils/firebase-util";
import { getCollectionNameByPostType } from "@/utils";
import { Role } from "@/enums/auth.enum";

interface IFilterValue {
  search?: string;
  status?: PostStatus;
  orderBy: OrderBy;
  isPublish?: PostPublishStatus;
}

// Helper function to check if a field contains the search value
const fieldMatchesSearch = (fieldValue: string, searchValue?: string) => {
  return (
    searchValue === undefined ||
    fieldValue.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const getCurrentBoardPathnameByType = (type: PostType) => {
  switch (type) {
    case PostType.ADVICE:
      return "/board-advice";
    case PostType.TOPIC:
      return "/board-topic";
    case PostType.QA:
      return "/board-qa";
    case PostType.REQUEST_MUSIC:
      return "/board-request-music";
    default:
      return "/home";
  }
};

const fetchPost = async (type: PostType, filterValue: IFilterValue) => {
  console.log(filterValue);
  let queryRef = query(getCollectionRef(getCollectionNameByPostType(type)));

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

  if (filterValue.orderBy) {
    queryRef = query(queryRef, orderBy("createdAt", filterValue.orderBy));
  }

  // Fetch the documents
  const querySnapshot = await getDocs(queryRef);

  // Map the documents to an array
  const dataArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dataArray;
};

interface BoardProps {
  type: PostType;
}

export const Board: React.FC<BoardProps> = ({ type }) => {
  const { user, role } = useAuthContext();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<IFilterValue>({
    search: undefined,
    status: undefined,
    orderBy: OrderBy.DESCENDING,
    isPublish: PostPublishStatus.PUBLISH,
  });

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await fetchPost(type, filterValue);

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
    filterValue.orderBy,
    type,
  ]);

  const onClickCardItemHandler = (id: string) => {
    router.push(getCurrentBoardPathnameByType(type) + "/" + id);
  };

  const boardItemData = useMemo(() => {
    const searchValue = filterValue.search || "";

    return data.filter((item: { id: any; name: any }) => {
      const idMatches = fieldMatchesSearch(item?.id || "", searchValue);
      const nameMatches = fieldMatchesSearch(item?.name || "", searchValue);

      return idMatches || nameMatches;
    });
  }, [data, filterValue.search]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center w-full">
        <Input
          aria-label="Search"
          className="w-full md:max-w-52"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
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
        <PostStatusSelect
          isFilter
          type={type}
          value={filterValue.status}
          onChange={(status) => {
            setFilterValue((prev) => ({
              ...prev,
              status,
            }));
          }}
        />
        <PostSortingDate
          value={filterValue.orderBy}
          onChange={(value) => {
            setFilterValue((prev) => ({
              ...prev,
              orderBy: value,
            }));
          }}
        />
        {role === Role.SUPER_ADMIN && (
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
          <Button onClick={() => fetchPost(type, filterValue)}>อีกครั้ง</Button>
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
};

export default Board;
