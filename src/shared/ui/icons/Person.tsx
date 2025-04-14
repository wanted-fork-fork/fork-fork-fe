import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPerson = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#CCC"
        d="M8 8a2.666 2.666 0 1 0 0-5.333A2.666 2.666 0 1 0 8 8m0 1.333c-1.78 0-5.333.894-5.333 2.667v1.333h10.667V12c0-1.773-3.554-2.667-5.334-2.667"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPerson;
