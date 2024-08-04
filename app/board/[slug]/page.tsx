"use client";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    try {
      const docRef = doc(db, "inbox", params.slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      //   res.status(500).json({ message: "Internal Server Error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="text-left w-full overflow-auto">
      <p>id: {params.slug}</p>
      <p>ชื่อ: {data?.name}</p>
      <p className="">ปัญหาที่ปรึกษา: {data?.message}</p>
      <p>id: {params.slug}</p>
    </section>
  );
}
