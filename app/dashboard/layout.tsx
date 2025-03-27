// app/dashboard/layout.tsx
import React from 'react';
// types/layout.d.ts หรือในไฟล์ที่ใช้กำหนด types
export interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode; // หรืออาจจะเป็น `boolean` ขึ้นอยู่กับการใช้งาน
  notification: React.ReactNode; // หรือเป็น `boolean` หรือประเภทที่เหมาะสม
}

const DashboardLayout: React.FC<LayoutProps> = ({ children, modal, notification }) => {
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        {modal && <div>{modal}</div>} {/* แสดง modal ถ้ามี */}
        {notification && <div>{notification}</div>} {/* แสดง notification ถ้ามี */}
      </header>
      <main>{children}</main> {/* แสดง content ของ children */}
    </div>
  );
};

export default DashboardLayout;
