// const isAdminMode = () => {
//   if (typeof window !== undefined)
//     return localStorage.getItem("isAdminMode") === "true";
// };

import { Timestamp } from "firebase/firestore";

import { collectionName } from "@/config/firebase";
import { PostType } from "@/enums/post.enum";

// export { isAdminMode };

const getCollectionNameByPostType = (type: PostType) => {
  switch (type) {
    case PostType.ADVICE:
      return collectionName.advice;
    case PostType.TOPIC:
      return collectionName.topic;
    case PostType.QA:
      return collectionName.qa;
    default:
      return collectionName.advice;
  }
};

function formatCreatedAt(createdAt: Timestamp): string {
  const now = new Date();
  const createdAtDate = createdAt.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const diffMs = now.getTime() - createdAtDate.getTime(); // Difference in milliseconds

  const diffMinutes = Math.floor(diffMs / 60000); // Convert to minutes
  const diffHours = Math.floor(diffMs / 3600000); // Convert to hours
  const diffDays = Math.floor(diffMs / 86400000); // Convert to days

  // If the difference is less than 1 minute
  if (diffMinutes < 1) {
    return "เพิ่งเกิดขึ้น";
  }

  // If the difference is less than 1 hour
  if (diffMinutes < 60) {
    return `${diffMinutes} นาทีก่อน`;
  }

  // If the difference is less than 24 hours
  if (diffHours < 24) {
    return `${diffHours} ชั่วโมงก่อน`;
  }

  // If the difference is greater than or equal to 1 day
  return formatDate(createdAtDate);
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
  const year = String(date.getFullYear() + 543); // Convert to Buddhist year (BE)
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export { getCollectionNameByPostType, formatCreatedAt };
