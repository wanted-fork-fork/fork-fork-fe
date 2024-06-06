import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={8} fill="none" viewBox="0 0 12 8" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.457 1.707A1 1 0 0 0 10.043.293L4.9 5.435 1.707 2.242A1 1 0 1 0 .293 3.656l3.872 3.872.028.03a1 1 0 0 0 1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheck;
