import React, { SetStateAction, useContext, useMemo, useState } from 'react';

interface AppState {
  currentPage: string;
}

interface AppStateUpdater {
  setCurrentPage: React.Dispatch<SetStateAction<string>>;
}

const AppStateContext = React.createContext<AppState | null>(null);
const AppStateUpdaterContext = React.createContext<AppStateUpdater | null>(
  null
);

export const AppStateProvider = ({ children }: { children: JSX.Element }) => {
  const [currentPage, setCurrentPage] = useState<string>('');

  const stateValue = useMemo(() => ({ currentPage }), [currentPage]);
  const updaterValue = useMemo(() => ({ setCurrentPage }), []);
  return (
    <AppStateContext.Provider value={stateValue}>
      <AppStateUpdaterContext.Provider value={updaterValue}>
        {children}
      </AppStateUpdaterContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('No Default value for AppState');
  }
  return ctx;
};

export const useAppStateUpdater = () => {
  const ctx = useContext(AppStateUpdaterContext);
  if (!ctx) {
    throw new Error('No Default value for AppStateUpdater');
  }
  return ctx;
};
