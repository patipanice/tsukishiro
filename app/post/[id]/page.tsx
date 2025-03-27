// "use client";
// import { Button } from "@heroui/button";
// import Link from "next/link";

// export async function generateStaticParams() {
//   // กำหนดพารามิเตอร์ที่ต้องการให้สร้างเป็นไฟล์ Static ล่วงหน้า
//   const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const postsData = await posts.json();

//   return postsData.slice(0, 3).map((post: { id: number }) => ({
//     id: post.id.toString(),
//   }));
// }

// ตัวอย่างการใช้งานใน page component ของ [id]
// export default function PostPage({ params }: { params: { id: string } }) {
//   return (
//     <div className="flex flex-col">
//       <p>Post ID: {params.id}</p>
//       <Link href={"/post/" + params.id}>Click to view post</Link>
//     </div>
//   );
// }


import { notFound } from 'next/navigation'

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
interface Post {
  id: string
  title: string
  content: string
}
 
async function getPost(id: string) {
  let res = await fetch(`https://api.vercel.app/blog/${id}`, {
    cache: 'force-cache',
  })
  let post: Post = await res.json()

  console.log(post)
  if (!post) notFound()

  return post
}
 
export async function generateStaticParams() {
  let posts = await fetch('https://api.vercel.app/blog', {
    cache: 'force-cache',
  }).then((res) => res.json())
 
  return posts.map((post: Post) => ({
    id: post.id.toString(),
  }))
}
 
export async function generateMetadata({ params }: { params: { id: string } }) {
  let post = await getPost(params.id)
 
  return {
    title: post.title,
  }
}
 
export default async function Page({ params }: { params: { id: string } }) {
  let post = await getPost(params.id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}