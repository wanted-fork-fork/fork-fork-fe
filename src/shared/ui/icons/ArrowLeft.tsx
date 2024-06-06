import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#918B92"
      fillRule="evenodd"
      d="M15.707 4.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L9.414 12l6.293-6.293a1 1 0 0 0 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowLeft;
