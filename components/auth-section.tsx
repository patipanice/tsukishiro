import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-context";

const AuthSection = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  return (
    <div>
      {user ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              size="sm"
              showFallback
              src="https://images.unsplash.com/broken"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="profile">โปรไฟล์</DropdownItem>
            <DropdownItem key="my-board"><NextLink href="/my-board">บอร์ดของฉัน</NextLink></DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={() => {
                logout();
              }}
            >
              ออกจากระบบ
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <NextLink
          className={
            pathname === "/signin"
              ? "text-primary-500 border-b-2 border-primary-500 pb-1"
              : "foreground"
          }
          href="/signin"
        >
          เข้าสู่ระบบ
        </NextLink>
      )}
    </div>
  );
};

export default AuthSection;
