import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAlert = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <circle cx={10} cy={10} r={7.5} fill="#FF4245" />
    <path d="M10.845 11.816H9.429l-.15-6.399h1.703zm-1.679 1.79q0-.256.132-.475a.98.98 0 0 1 .845-.488q.257 0 .476.131.226.132.357.357a.952.952 0 0 1 0 .964 1 1 0 0 1-.357.357.953.953 0 0 1-.964 0 .98.98 0 0 1-.489-.845" />
  </svg>
);
export default SvgAlert;
