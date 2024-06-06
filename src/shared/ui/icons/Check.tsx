import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M15.457 7.707a1 1 0 0 0-1.414-1.414L8.9 11.435 5.707 8.242a1 1 0 1 0-1.414 1.414l3.872 3.872.028.03a1 1 0 0 0 1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheck;
