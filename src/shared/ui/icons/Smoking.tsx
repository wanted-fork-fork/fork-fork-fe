import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSmoking = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" viewBox="0 0 21 20" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#CCC"
        d="M15.5 13.333h1.25v2.5H15.5zm-13.334 0h12.5v2.5h-12.5zm11.692-4.834h-1.275c-.85 0-1.542-.816-1.542-1.666s.692-1.459 1.542-1.459v-1.25a2.792 2.792 0 0 0 0 5.584h1.275c.875 0 1.641.616 1.641 1.708v1.083h1.25v-1.366c0-1.509-1.333-2.634-2.891-2.634m3.725 4.834h1.25v2.5h-1.25zM16.208 6.44a2.77 2.77 0 0 0 .833-1.983 2.79 2.79 0 0 0-2.792-2.792v1.25c.85 0 1.542.692 1.542 1.542s-.692 1.541-1.542 1.541v1.25c1.867 0 3.334 1.525 3.334 3.392v1.858h1.25v-1.866c0-1.85-1.067-3.45-2.625-4.192"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h20v20H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSmoking;
