import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile, User as FirebaseUser } from "firebase/auth";
import { Avatar, Progress } from "@heroui/react";
import imageCompression from "browser-image-compression";
import { doc, updateDoc } from "firebase/firestore";

import { CameraIcon } from "./icons/CameraIcon";

import { auth, collectionName, db, storage } from "@/config/firebase";

interface ImageUploadProps {
  user: FirebaseUser | null;
  refreshRoute: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ user, refreshRoute }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(user?.photoURL || "");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false); // State to track if uploading is in progress

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsUploading(true);
      const options = {
        maxSizeMB: 0.5, // Max file size in MB
        maxWidthOrHeight: 1280, // Max width or height of the image
        useWebWorker: true, // Use a web worker for faster compression
      };

      const compressedFile = await imageCompression(file, options);

      const storageRef = ref(storage, `avatars/${compressedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setIsUploading(false);
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImage(downloadURL);
            setIsUploading(false);
            await updateUserProfile(downloadURL);
          });
        }
      );
    }
  };

  const updateUserProfile = async (photoURL: string) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, { photoURL });
        await updateUserProfileFireStore(photoURL).then((res) => {
          if (res?.status === 200) refreshRoute();
        });
      } catch (error) { 
        //todo: error
        alert(error);
      }
    }
  };

  const updateUserProfileFireStore = async (photoURL: string) => {
    try {
      const docRef = doc(db, collectionName.users, String(user?.uid));

      await updateDoc(docRef, {
        photoURL,
      });

      return { status: 200 };
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      aria-label="Click to upload avatar"
      className="relative w-32 h-32"
      role="button"
      style={{ cursor: "pointer" }}
      tabIndex={0}
      onClick={handleAvatarClick}
    >
      <Avatar
        className="w-32 h-32 text-large"
        fallback={
          <CameraIcon
            className="animate-pulse w-20 h-20 text-default-500"
            fill="currentColor"
            height={undefined}
            size={60}
            width={undefined}
          />
        }
        src={image || ""}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
        <CameraIcon
          className="w-10 h-10 text-white"
          fill={undefined}
          height={undefined}
          size={undefined}
          width={undefined}
        />
      </div>
      <input
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
      {isUploading && (
        <Progress
          aria-label="Loading..."
          className="my-2"
          color="danger"
          value={progress}
        />
      )}
    </div>
  );
};

export default ImageUpload;
