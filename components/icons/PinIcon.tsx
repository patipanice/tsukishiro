import { JSX, SVGProps } from "react";

export const PinIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 1024 1023"
    {...props}
  >
    <path
      fill="red"
      d="m896 800l128 223l-224-128l-1-6l-168-167l-152 151q-42 42-95-10V684L126 416l-13 12q-19 20-46.5 20t-47-19.5t-19.5-47T19 334L335 19q20-19 47.5-19t47 19T449 65.5T429 113l-13 13l269 258l179 1q52 52 9 94L722 630l168 168z"
    />
  </svg>
);