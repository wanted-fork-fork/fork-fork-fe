import { RadioWithInput } from 'src/shared/ui/RadioWithInput/RadioWithInput';
import { Radio } from 'src/shared/ui/Radio/Radio';

export type RadioMeta<RadioKeyType extends string> = { key: RadioKeyType; name: string } & (
  | { allowInput: true; placeholder: string }
  | { allowInput: false }
);

export const RadioList = <RadioKeyType extends string>({
  radioMetaList,
  selected,
  onSelect,
  inputValue,
  onChangeInputValue,
}: {
  radioMetaList: RadioMeta<RadioKeyType>[];
  selected: RadioKeyType | null;
  onSelect: (key: RadioKeyType) => void;
  inputValue?: string;
  onChangeInputValue?: (value: string) => void;
}) => {
  return (
    <>
      {radioMetaList.map((meta) =>
        meta.allowInput ? (
          <RadioWithInput
            key={meta.key}
            value={meta.key}
            checked={selected === meta.key}
            label={meta.name}
            inputPlaceholder={meta.placeholder}
            inputValue={inputValue}
            onChangeInputValue={onChangeInputValue}
            onChange={() => onSelect(meta.key)}
          />
        ) : (
          <Radio
            key={meta.key}
            value={meta.key}
            checked={selected === meta.key}
            label={meta.name}
            onChange={() => onSelect(meta.key)}
          />
        ),
      )}
    </>
  );
};
