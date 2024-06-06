import * as React from 'react';
import type { SVGProps } from 'react';
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" viewBox="0 0 24 25" {...props}>
    <path
      fill="#918B92"
      fillRule="evenodd"
      d="M3.9 15c.497 0 .9.448.9 1v3.5h14.4V16c0-.552.403-1 .9-1s.9.448.9 1v4.5c0 .552-.403 1-.9 1H3.9c-.497 0-.9-.448-.9-1V16c0-.552.403-1 .9-1"
      clipRule="evenodd"
    />
    <path
      fill="#918B92"
      fillRule="evenodd"
      d="M12 17c-.592 0-1.071-.48-1.071-1.071v-8.77l-3.1 3.099a1.071 1.071 0 0 1-1.515-1.516l4.928-4.928a1.07 1.07 0 0 1 1.516 0l4.928 4.928a1.071 1.071 0 0 1-1.515 1.516l-3.1-3.1v8.77c0 .592-.48 1.072-1.071 1.072"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgShare;
