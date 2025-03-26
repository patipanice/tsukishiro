"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useFormState, useFormStatus } from "react-dom";

import { createInvoice } from "./action";

interface Post {
  id: string;
  title: string;
  content: string;
}

// async function getPost(id: string) {
//   let res = await fetch(`https://api.vercel.app/blog/${id}`, {
//     cache: 'force-cache',
//   })
//   let post: Post = await res.json()
//   console.log(post)
//   if (!post) notFound()
//   return post
// }

// export async function generateStaticParams() {
//   let posts = await fetch('https://api.vercel.app/blog', {
//     cache: 'force-cache',
//   }).then((res) => res.json())

//   return posts.map((post: Post) => ({
//     id: post.id,
//   }))
// }

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   let post = await getPost(params.id)

//   return {
//     title: post.title,
//   }
// }

const initialState = {
  message: "",
};

export default function Page() {
  const [state, formAction] = useFormState(createInvoice, initialState);
  const { pending } = useFormStatus();

  const testLoopArray = () => {
    const arr = [1, 2, 3, 4, 5];
    arr.forEach((item) => {
      console.log;
    });
    return arr;
  };

  testLoopArray();

  return (
    <form action={formAction}>
      <Input name="customerId" type="text" />
      <Input name="amount" type="text" />
      <Input name="status" type="text" />
      <Button isDisabled={pending} type="submit">
        Create Invoice
      </Button>
      <p aria-live="polite">{state?.message}</p>
    </form>
  );
}
