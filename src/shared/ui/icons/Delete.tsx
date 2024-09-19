import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <path
      fill="#726D74"
      fillRule="evenodd"
      d="M11.5 3a2 2 0 0 0-2 2H6a1.5 1.5 0 0 0-.5 2.915V18a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7.915A1.5 1.5 0 0 0 19 5h-3.5a2 2 0 0 0-2-2zm-4 15V8h10v10a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1m2-8v7h2v-7zm4 7v-7h2v7z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDelete;
