"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";

import { UploadCircleSolidIcon } from "./icons/UploadCircleSolidIcon";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Show button after scrolling down 300px
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showButton) {
    return (
      <Button
        isIconOnly
        aria-label="Scroll to top"
        className="fixed bottom-5 right-5 z-50"
        color="default"
        variant="light"
        onClick={scrollToTop}
      >
        <UploadCircleSolidIcon className=" text-4xl" />
      </Button>
    );
  }

  return <></>;
};

export default BackToTopButton;
