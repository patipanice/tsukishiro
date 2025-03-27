import { NextRequest } from 'next/server';
// app/api/users/route.ts
import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers'

// สมมติว่าเรามีข้อมูลตัวอย่างผู้ใช้
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// Route Handler สำหรับคำขอ GET
export async function GET(request :NextRequest) {
  const token = request.cookies.get('token')

  console.log(token)

  // const cookieStore = cookies()
  // console.log(cookieStore.get('token')?.value)
  return NextResponse.json(users);  // ส่งข้อมูลผู้ใช้ทั้งหมด
}

// Route Handler สำหรับคำขอ POST
export async function POST(request: Request) {
  const newUser = await request.json();  // รับข้อมูลผู้ใช้ใหม่จาก body

  users.push(newUser);  // เพิ่มผู้ใช้ใหม่ไปยังข้อมูล

  return NextResponse.json(newUser, { status: 201 });  // ส่งข้อมูลผู้ใช้ใหม่กลับไป
}

// Route Handler สำหรับคำขอ PUT (แก้ไขข้อมูลผู้ใช้)
export async function PUT(request: Request) {
  const { id, name } = await request.json();
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  users[userIndex].name = name;

  return NextResponse.json(users[userIndex]);  // ส่งข้อมูลผู้ใช้ที่อัปเดต
}

// Route Handler สำหรับคำขอ DELETE
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  users.splice(userIndex, 1);  // ลบผู้ใช้

  return NextResponse.json({ message: 'User deleted' }, { status: 200 });
}
