import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { GenerateFormLink } from 'src/entities/candidates/_common/components/GenerateFormLink/GenerateFormLink';

type GenerateFormLinkContextState = {
  openGenerateFormBottomSheet: () => void;
};

const GenerateFormLinkContext = createContext<GenerateFormLinkContextState | null>(null);

export const GenerateFormLinkProvider = ({ children }: PropsWithChildren) => {
  const [isTriggerOpen, setTriggerOpen] = useState(false);

  const value = useMemo(
    () => ({
      openGenerateFormBottomSheet: () => {
        setTriggerOpen(true);
      },
    }),
    [],
  );

  return (
    <GenerateFormLinkContext.Provider value={value}>
      {children}
      <GenerateFormLink isTriggerOpen={isTriggerOpen} setTriggerOpen={setTriggerOpen} />
    </GenerateFormLinkContext.Provider>
  );
};

export const useGenerateFormLink = () => {
  const context = useContext(GenerateFormLinkContext);

  if (context === null) {
    throw new Error('useGenerateFormLink must be used within a component.');
  }

  return context;
};
