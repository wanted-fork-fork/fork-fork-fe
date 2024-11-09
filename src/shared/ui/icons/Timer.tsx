import type { SVGProps } from 'react';
import * as React from 'react';

const SvgTimer = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={8} stroke="#D752FF" fill={'none'} strokeWidth={2} />
    <path stroke="#D752FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 3" />
  </svg>
);
export default SvgTimer;
