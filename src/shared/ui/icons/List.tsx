import * as React from 'react';
import type { SVGProps } from 'react';
const SvgList = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <path stroke="#918B92" strokeLinecap="round" strokeWidth={2} d="M21 5H8M21 12H8M21 19H8" />
    <circle cx={3} cy={5} r={0.5} fill="#918B92" stroke="#918B92" />
    <circle cx={3} cy={12} r={0.5} fill="#918B92" stroke="#918B92" />
    <circle cx={3} cy={19} r={0.5} fill="#918B92" stroke="#918B92" />
  </svg>
);
export default SvgList;
