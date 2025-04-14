import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#CCC"
        d="M8 1.333A4.663 4.663 0 0 0 3.333 6C3.333 9.5 8 14.667 8 14.667S12.666 9.5 12.666 6A4.663 4.663 0 0 0 8 1.333m0 6.334a1.667 1.667 0 1 1 0-3.335 1.667 1.667 0 0 1 0 3.335"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLocation;
