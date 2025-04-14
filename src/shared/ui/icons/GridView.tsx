import * as React from 'react';
import type { SVGProps } from 'react';
const SvgGridView = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <g fill="#918B92" clipPath="url(#a)">
      <path d="M11 10.111V3.89C11 3.4 10.1 3 9 3H5c-1.1 0-2 .4-2 .889v6.222C3 10.6 3.9 11 5 11h4c1.1 0 2-.4 2-.889M21 10.111V3.89C21 3.4 20.1 3 19 3h-4c-1.1 0-2 .4-2 .889v6.222c0 .489.9.889 2 .889h4c1.1 0 2-.4 2-.889M11 20.111V13.89C11 13.4 10.1 13 9 13H5c-1.1 0-2 .4-2 .889v6.222C3 20.6 3.9 21 5 21h4c1.1 0 2-.4 2-.889M21 20.111V13.89c0-.489-.9-.889-2-.889h-4c-1.1 0-2 .4-2 .889v6.222c0 .489.9.889 2 .889h4c1.1 0 2-.4 2-.889" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgGridView;
