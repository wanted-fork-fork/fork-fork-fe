type Props<Case extends string | number> = {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value: Case;
  defaultComponent?: JSX.Element | null;
};

// https://github.com/toss/slash/blob/main/packages/react/react/src/components/SwitchCase/SwitchCase.tsx
export const SwitchCase = <Case extends string | number>({
  value,
  caseBy,
  defaultComponent: defaultComponent = null,
}: Props<Case>) => {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
};
