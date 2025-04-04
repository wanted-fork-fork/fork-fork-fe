import type { SVGProps } from 'react';
import * as React from 'react';

const SvgClosedEye = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <g stroke="#726D74" strokeWidth={2} clipPath="url(#a)">
      <path d="M2 8c3.418 8.734 15.61 9.18 19.656.719L22 8M12 15v4M5 13l-2 3.464M19 13l2 3.464" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgClosedEye;
