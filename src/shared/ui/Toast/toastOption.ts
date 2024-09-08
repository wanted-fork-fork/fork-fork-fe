import { ToastOptions } from 'react-hot-toast';
import { Theme } from 'src/shared/styles/constants';

export const ToastOption: ToastOptions = {
  style: {
    background: Theme.color.neutral50,
    borderRadius: '32px',
    color: '#fff',
    fontSize: '16px',
    padding: '8px 48px',
    zIndex: 99999999,
  },
};
