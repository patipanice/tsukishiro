import { JSX, SVGProps } from "react";

export const MusicNoteIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M9 3v13.55a4 4 0 1 0 2 3.45V6.15l10-2V14.55a4 4 0 1 0 2 3.45V2.5a1 1 0 0 0-1.25-.97l-12 2.4A1 1 0 0 0 9 4.9V3z" />
  </svg>
);
