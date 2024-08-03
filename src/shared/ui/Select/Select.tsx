import { ArrowDown } from 'src/shared/ui/icons';
import * as _Select from '@radix-ui/react-select';
import { SelectItemProps, SelectProps } from '@radix-ui/react-select';
import styles from './Select.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';

type SelectProp = SelectProps & { placeholder: string };

export const Select = ({ placeholder, children, ...props }: SelectProp) => (
  <_Select.Root {...props}>
    <_Select.Trigger className={styles.SelectTrigger}>
      <_Select.Value placeholder={placeholder} />
      <_Select.Icon>
        <ArrowDown width={16} />
      </_Select.Icon>
    </_Select.Trigger>
    <_Select.Portal>
      <_Select.Content sideOffset={8} position="popper" className={styles.SelectContent}>
        <ScrollView.Root className={styles.SelectScrollRoot}>
          <_Select.Viewport asChild>
            <ScrollView.Viewport>{children}</ScrollView.Viewport>
          </_Select.Viewport>
        </ScrollView.Root>
      </_Select.Content>
    </_Select.Portal>
  </_Select.Root>
);

type ItemProp = SelectItemProps & {
  text: string;
};
const Item = ({ text, ...props }: ItemProp) => (
  <_Select.Item className={styles.SelectItem} value={props.value}>
    <_Select.ItemText>{text}</_Select.ItemText>
  </_Select.Item>
);

Select.Item = Item;
