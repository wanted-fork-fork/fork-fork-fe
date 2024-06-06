import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" viewBox="0 0 24 25" {...props}>
    <path
      stroke="#121113"
      strokeLinecap="round"
      strokeWidth={2}
      d="m15.15 9.075-6.85 6.85M16.344 13.59l2.803-2.802a4.036 4.036 0 0 0 0-5.708v0a4.036 4.036 0 0 0-5.708 0l-2.803 2.803M7.11 11.41l-2.804 2.802a4.036 4.036 0 0 0 0 5.708v0a4.036 4.036 0 0 0 5.708 0l2.803-2.803"
    />
  </svg>
);
export default SvgLink;
