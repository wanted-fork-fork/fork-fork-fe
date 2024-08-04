import { createContext, PropsWithChildren, useContext, useState } from 'react';
import styles from './Tab.module.css';

type TabContextStore<TabType extends string> = {
  selectedTab: TabType;
  // eslint-disable-next-line no-unused-vars
  setSelectedTab: (tabType: TabType) => void;
};

const TabContext = createContext<TabContextStore<any>>({
  selectedTab: '',
  setSelectedTab: () => {},
});

const TabProvider = <TabType extends string>({ initialTab, children }: PropsWithChildren<{ initialTab: TabType }>) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(initialTab);

  return <TabContext.Provider value={{ selectedTab, setSelectedTab }}>{children}</TabContext.Provider>;
};

export const Tab = <TabType extends string>({ initialTab, children }: PropsWithChildren<{ initialTab: TabType }>) => {
  return <TabProvider initialTab={initialTab}>{children}</TabProvider>;
};

const TabList = ({ className = '', children }: PropsWithChildren<{ className?: string }>) => (
  <div className={`${styles.TabTriggerContainer} ${className}`} role={'tablist'}>
    {children}
  </div>
);

const TabTrigger = <TabType extends string>({ tabType, name }: { tabType: TabType; name: string }) => {
  const { selectedTab, setSelectedTab } = useContext(TabContext);
  return (
    <button
      className={styles.TabTrigger}
      role={'tab'}
      aria-selected={selectedTab === tabType}
      onClick={() => setSelectedTab(tabType)}
    >
      {name}
    </button>
  );
};

const TabContent = <TabType extends string>({ tabType, children }: PropsWithChildren<{ tabType: TabType }>) => {
  const { selectedTab } = useContext(TabContext);
  return <>{selectedTab === tabType && children}</>;
};

Tab.List = TabList;
Tab.Trigger = TabTrigger;
Tab.Content = TabContent;
