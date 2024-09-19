import * as React from 'react';
import type { SVGProps } from 'react';
const SvgToggleOff = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={24} fill="none" viewBox="0 0 48 24" {...props}>
    <rect width={48} height={24} fill="#EBEAEB" rx={12} />
    <circle cx={12} cy={12} r={9} fill="#AFAAB1" />
  </svg>
);
export default SvgToggleOff;
