import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <circle cx={12.5} cy={4} r={2} fill="#918B92" />
    <circle cx={12.5} cy={12} r={2} fill="#918B92" />
    <circle cx={12.5} cy={20} r={2} fill="#918B92" />
  </svg>
);
export default SvgMenu;
