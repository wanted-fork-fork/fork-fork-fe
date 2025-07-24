import * as React from 'react';
import type { SVGProps } from 'react';
const SvgShoppingBag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#CDCACE"
        d="M16.666 5h-3.333a3.332 3.332 0 1 0-6.667 0H3.333c-.917 0-1.667.75-1.667 1.666v10c0 .917.75 1.667 1.667 1.667h13.333c.917 0 1.667-.75 1.667-1.667v-10c0-.917-.75-1.667-1.667-1.667M9.999 3.332c.917 0 1.667.75 1.667 1.666H8.333c0-.916.75-1.666 1.666-1.666m6.667 13.333H3.333v-10h3.333v1.667c0 .458.375.833.833.833a.836.836 0 0 0 .834-.833V6.666h3.333v1.667c0 .458.375.833.833.833a.836.836 0 0 0 .834-.833V6.666h3.333z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgShoppingBag;
