import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <path
      fill="#CDCACE"
      fillRule="evenodd"
      d="M2 8c0-.368.298-.667.667-.667h10.666a.667.667 0 1 1 0 1.334H2.667A.667.667 0 0 1 2 8"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMinus;
