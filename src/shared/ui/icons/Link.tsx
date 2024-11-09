import type { SVGProps } from 'react';
import * as React from 'react';

const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <path
      stroke="#D752FF"
      strokeLinecap="round"
      strokeWidth={2}
      fill="none"
      d="m15.9 8.575-6.85 6.85M17.094 13.09l2.803-2.802a4.036 4.036 0 0 0 0-5.708v0a4.036 4.036 0 0 0-5.708 0l-2.803 2.803M7.86 10.91l-2.804 2.802a4.036 4.036 0 0 0 0 5.708v0a4.036 4.036 0 0 0 5.708 0l2.803-2.803"
    />
  </svg>
);
export default SvgLink;
