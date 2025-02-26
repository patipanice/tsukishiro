import { JSX, SVGProps } from "react";

export const BackIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    height="1em"
    viewBox="0 0 1024 1024"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
      fill="currentColor"
     />
    <path
      d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      fill="currentColor"
     />
  </svg>
);
