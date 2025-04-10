import type { SVGProps } from "react";

export function QuestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 24"
      {...props}
    >
      <path
        d="M0.913086 23.073V2.00006L10.3359 7.42288"
        stroke="currentColor"
        strokeWidth="1.3"
      ></path>
      <path
        d="M0.913086 6.4715L10.2398 11.8467"
        stroke="currentColor"
        strokeWidth="1.3"
      ></path>
      <path
        d="M4.90576 20.933V13.2269L8.75183 15.3675V18.6973"
        stroke="currentColor"
        strokeWidth="1.3"
      ></path>
      <path
        d="M12.3569 8.19335L18.6981 11.8473L12.3569 15.5013L12.3569 8.19335Z"
        stroke="currentColor"
        strokeWidth="1.3"
      ></path>
    </svg>
  );
}

