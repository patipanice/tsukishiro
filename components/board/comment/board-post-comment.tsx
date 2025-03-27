import React from "react";
import {
  Card,
  Button,
  User,
  CardBody,
} from "@heroui/react";
import { useFormik } from "formik";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

import CommentInputBox from "./comment-input-box";

import { useAuthContext } from "@/contexts/auth-context";
import { collectionName, db } from "@/config/firebase";
import { CommentForm } from "@/types/comment.interface";
import { BinIcon } from "@/components/icons/BinIcon";
import { formattedDate } from "@/components/post-it-card";


function isValidUser(
  user: FirebaseUser | undefined | null
): user is FirebaseUser {
  return user !== undefined && user !== null;
}

const addComment = async (postId: string, comment: CommentForm) => {
  try {
    const docRef = doc(db, collectionName.advice, postId);

    await updateDoc(docRef, {
      comments: arrayUnion(comment),
    });

    return { status: 200 };
  } catch (error) {
    alert(error);
  }
};

const fetchDocument = async (documentId: string) => {
  const docRef = doc(db, collectionName.advice, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");

    return null;
  }
};

const deleteComment = async (documentId: string, commentId: string) => {
  try {
    // Fetch the document to get the existing comments
    const documentData = await fetchDocument(documentId);

    if (documentData && Array.isArray(documentData.comments)) {
      // Prepare the comment object with the specified ID
      const commentToRemove = documentData.comments.find(
        (comment) => comment.id === commentId
      );

      if (commentToRemove) {
        // Reference to the Firestore document
        const docRef = doc(db, collectionName.advice, documentId);

        // Remove the comment from the array in Firestore
        await updateDoc(docRef, {
          comments: arrayRemove(commentToRemove),
        });

        console.log("Comment deleted successfully!");
      } else {
        console.log("Comment not found!");
      }
    } else {
      console.log("No comments found or document is empty.");
    }
  } catch (error) {
    console.error("Error deleting comment: ", error);
  }
};

interface CommentProps extends CommentForm {
  canDeleteComment: boolean;
  postId: string;
  // replies?: CommentProps[];
  // onReply?: () => void;
  onClickDeleteComment: () => void;
}

const Comment: React.FC<CommentProps> = ({
  message,
  user,
  isAnonymous,
  createdAt,
  canDeleteComment,
  postId,
  id,
  onClickDeleteComment,
  // replies,
  // onReply,
}) => {
  return (
    <Card>
      <CardBody>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <User
                avatarProps={{
                  src: user?.photoURL || "",
                  size: "sm",
                }}
                description={formattedDate(createdAt)}
                name={!isAnonymous && user ? user?.displayName : "ไม่ระบุตัวตน"}
              />
              {/* {canDeleteComment && (
                <Chip variant="flat" radius="sm" size="sm" color="primary">
                  คุณ
                </Chip>
              )} */}
            </div>
            {canDeleteComment && (
              <Button
                isIconOnly
                aria-label="Bin"
                color="danger"
                size="sm"
                variant="light"
                onClick={onClickDeleteComment}
              >
                <BinIcon />
              </Button>
            )}
          </div>
          <div className="mx-10 my-2">
            <p className="text-sm font-light text-gray-400">&quot;{message}&quot;</p>
          </div>
        </div>
        {/* <Avatar src={user?.photoURL || ""} size="sm"/> */}
        {/* <CardFooter>
          <HeartFilledIcon/>
        </CardFooter> */}
      </CardBody>
    </Card>
  );
};

interface ICommentsProps {
  postId: string;
  comments?: CommentForm[];
  onRefetchHandler: () => void;
}

const Comments: React.FC<ICommentsProps> = ({
  postId,
  comments,
  onRefetchHandler,
}) => {
  const { user } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      message: "",
      isAnonymous: false,
    },
    onSubmit(values) {
      const comment: CommentForm = {
        id: uuidv4(),
        message: values.message,
        isAnonymous: values.isAnonymous,
        user: isValidUser(user)
          ? {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            }
          : null,
        createdAt: Timestamp.fromDate(new Date()),
      };

      addComment(postId, comment)
        .then(() => {
          formik.resetForm();
          onRefetchHandler();
        })
        .catch((err) => {
          alert(err);
        });
    },
  });

  return (
    <div className="px-4 md:px-10">
      <CommentInputBox formik={formik} user={user} />
      <div className="flex flex-col gap-y-3 mt-8 px-2 md:px-10">
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            canDeleteComment={user ? comment.user?.uid === user?.uid : false}
            createdAt={comment.createdAt}
            id={comment.id}
            isAnonymous={comment.isAnonymous}
            message={comment.message}
            postId={postId}
            user={comment.user}
            onClickDeleteComment={() => {
              deleteComment(postId, comment.id).then(() => {
                onRefetchHandler();
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
