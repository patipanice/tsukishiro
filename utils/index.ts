// const isAdminMode = () => {
//   if (typeof window !== undefined)
//     return localStorage.getItem("isAdminMode") === "true";
// };

import { collectionName } from "@/config/firebase";
import { PostType } from "@/enums/post.enum";

// export { isAdminMode };

const getCollectionNameByPostType = (type: PostType) => {
  switch (type) {
    case PostType.ADVICE:
      return collectionName.advice;
    case PostType.TOPIC:
      return collectionName.topic;
    default:
      return collectionName.advice;
    // case PostType.QA: return collectionName.qa,
  }
};


export {
    getCollectionNameByPostType
}