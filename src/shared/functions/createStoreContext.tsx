import { StoreApi, UseBoundStore } from 'zustand';
import { createContext, ReactNode, useContext, useRef } from 'react';

export const createStoreContext = <State,>(createStore: () => UseBoundStore<StoreApi<State>>) => {
  const Context = createContext<UseBoundStore<StoreApi<State>> | null>(null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<UseBoundStore<StoreApi<State>>>();
    if (!storeRef.current) {
      storeRef.current = createStore();
    }
    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>;
  };

  const useSelector = <U,>(params: (state: State) => U) => {
    const useContextStore = useContext(Context);
    if (!useContextStore) {
      throw Error('Context 안에서 사용해 주세요');
    }
    return useContextStore(params);
  };

  return [Provider, useSelector] as const;
};
