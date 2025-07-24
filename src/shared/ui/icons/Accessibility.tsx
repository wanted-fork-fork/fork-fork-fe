import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAccessibility = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#CDCACE"
        d="M10 1.666c.917 0 1.667.75 1.667 1.667 0 .916-.75 1.666-1.667 1.666s-1.667-.75-1.667-1.666c0-.917.75-1.667 1.667-1.667m7.5 5.833h-5v10.834h-1.667v-5H9.167v5H7.5V7.499h-5V5.833h15z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAccessibility;
