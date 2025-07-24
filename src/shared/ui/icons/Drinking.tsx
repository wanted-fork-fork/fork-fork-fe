import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDrinking = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <path
      fill="#CDCACE"
      d="M15.144 2.929c1.155.123 2.003 1.14 1.835 2.27l-.705 4.717-.817 6.248c-.13 1-1.02 1.752-2.075 1.752v-2l.654-5H5.964l.654 5v2l-.196-.009c-.903-.08-1.651-.712-1.846-1.558l-.033-.185-.817-6.248-.705-4.717c-.18-1.205.798-2.283 2.07-2.283h9.818zm-1.762 12.987v2H6.618v-2zm-7.693-7h8.622l.598-4H5.09z"
    />
    <path fill="#CDCACE" d="M6.545 16.916h6.91l.272-2H6.273z" />
  </svg>
);
export default SvgDrinking;
