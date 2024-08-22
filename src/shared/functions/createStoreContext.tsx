import { StoreApi, UseBoundStore } from 'zustand';
import { createContext, ReactNode, useContext, useRef } from 'react';

export const createStoreContext = <State, StateWithAction extends State>(
  createStore: (initialState?: State) => UseBoundStore<StoreApi<StateWithAction>>,
) => {
  const Context = createContext<UseBoundStore<StoreApi<StateWithAction>> | null>(null);

  const Provider = ({ children, initialState }: { children: ReactNode; initialState?: State }) => {
    const storeRef = useRef<UseBoundStore<StoreApi<StateWithAction>>>();
    if (!storeRef.current) {
      storeRef.current = createStore(initialState);
    }
    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>;
  };

  const useSelector = <U,>(params: (state: StateWithAction) => U) => {
    const useContextStore = useContext(Context);
    if (!useContextStore) {
      throw Error('Context 안에서 사용해 주세요');
    }
    return useContextStore(params);
  };

  return [Provider, useSelector] as const;
};
