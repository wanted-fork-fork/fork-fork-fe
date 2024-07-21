import { DetailedHTMLProps, OptionHTMLAttributes, PropsWithChildren, SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';
import { ArrowDown } from 'src/shared/ui/icons';

type SelectProp = PropsWithChildren<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>>;

export const Select = ({ className, children, ...props }: SelectProp) => (
  <label className={`${styles.Label} ${className}`}>
    <select className={styles.Select} {...props}>
      {children}
    </select>
    <span className={styles.Marker}>
      <ArrowDown width={16} height={16} color={'#918b92'} />
    </span>
  </label>
);

type ItemProp = DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> & {
  text: string;
};
const Item = ({ text, ...props }: ItemProp) => (
  <option className={styles.Item} {...props}>
    {text}
  </option>
);

const DefaultItem = ({ text }: { text: string }) => (
  <option disabled hidden value={''}>
    {text}
  </option>
);

Select.DefaultItem = DefaultItem;
Select.Item = Item;
