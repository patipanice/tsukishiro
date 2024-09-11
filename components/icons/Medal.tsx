import { JSX, SVGProps } from "react";

export const Medal = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 84 100" {...props}>
  <path fill="#2980B9" d="M27 0H0l30 60h27L27 0z"></path>
  <path fill="#3498DB" d="M57 0h27L54 60H27L57 0z"></path>
  <path fill="#F1C40E" d="M42 40c16.568 0 30 13.434 30 30c0 16.568-13.432 30-30 30c-16.567 0-30-13.432-30-30s13.431-30 30-30z"></path>
  <path fill="#D8B00C" d="M42 46c-13.255 0-24 10.745-24 24s10.745 24 24 24s24-10.745 24-24s-10.745-24-24-24zm0 46c-12.149 0-22-9.85-22-22c0-12.148 9.851-22 22-22c12.15 0 22 9.852 22 22c0 12.15-9.85 22-22 22z"></path>
  <path fill="#CDA70C" d="M16.377 85.609c3.935 6.443 10.234 11.283 17.69 13.322L51 82l-5-19l-6.004-1.011l-23.619 23.62z"></path>
  <path fill="#B8960A" d="m39.173 93.829l1.853-1.854c-8.243-.359-15.308-5.256-18.761-12.254l-1.486 1.485c3.607 6.817 10.398 11.683 18.394 12.623z"></path>
  <path fill="#FFF55C" d="M45.988 81.98V65.973h-5.992V61.99c.888.021 1.747.09 2.574-.075c1.021-.203 1.312-.278 1.949-.712c1.109-.749 1.373-1.23 1.769-1.926c.558-.979.507-1.311.649-2.279h4.068V81.98h-5.017z"></path>
</svg>
  )