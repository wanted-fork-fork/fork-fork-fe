import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <g stroke="#000" clipPath="url(#a)">
      <circle cx={12} cy={12} r={8.5} />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 11 3 3 3-3" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCheckCircle;
