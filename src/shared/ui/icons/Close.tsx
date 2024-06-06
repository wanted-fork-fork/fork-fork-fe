import * as React from 'react';
import type { SVGProps } from 'react';
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#918B92"
      fillRule="evenodd"
      d="M18.364 5.636a1 1 0 0 1 0 1.414L7.05 18.364a1 1 0 0 1-1.414-1.414L16.95 5.636a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
    <path
      fill="#918B92"
      fillRule="evenodd"
      d="M5.636 5.636a1 1 0 0 1 1.414 0L18.364 16.95a1 1 0 0 1-1.415 1.414L5.636 7.05a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClose;
