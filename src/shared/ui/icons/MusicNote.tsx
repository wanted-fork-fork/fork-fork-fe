import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMusicNote = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <path
      fill="#CDCACE"
      d="M8.333 17.5a3.2 3.2 0 0 1-2.354-.98A3.2 3.2 0 0 1 5 14.168q0-1.376.98-2.354a3.2 3.2 0 0 1 2.353-.98q.48 0 .885.114.407.115.782.345V2.5h5v3.333h-3.333v8.334a3.2 3.2 0 0 1-.98 2.354 3.2 3.2 0 0 1-2.354.979"
    />
  </svg>
);
export default SvgMusicNote;
