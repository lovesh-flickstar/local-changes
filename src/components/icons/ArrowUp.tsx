import type { SVGProps } from "react";

export function SolarArrowUpLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 20V4m0 0l6 6m-6-6l-6 6"
      ></path>
    </svg>
  );
}
