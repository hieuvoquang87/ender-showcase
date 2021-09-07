import React, { SetStateAction, useContext, useMemo, useState } from 'react';
import { Lease, Property } from '../types';

interface AppState {
  currentPage: string;
  properties: Property[];
  selectedProperty: Property | null;
  leases: Lease[];
}

interface AppStateUpdater {
  setCurrentPage: React.Dispatch<SetStateAction<string>>;
  setProperties: React.Dispatch<SetStateAction<Property[]>>;
  setSelectedProperty: React.Dispatch<SetStateAction<Property | null>>;
  setLeases: React.Dispatch<SetStateAction<Lease[]>>;
}

const AppStateContext = React.createContext<AppState | null>(null);
const AppStateUpdaterContext = React.createContext<AppStateUpdater | null>(
  null
);

export const AppStateProvider = ({ children }: { children: JSX.Element }) => {
  const [currentPage, setCurrentPage] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [leases, setLeases] = useState<Lease[]>([]);

  const stateValue = useMemo(
    () => ({ currentPage, properties, selectedProperty, leases }),
    [currentPage, properties, selectedProperty, leases]
  );
  const updaterValue = useMemo(
    () => ({ setCurrentPage, setProperties, setSelectedProperty, setLeases }),
    []
  );
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
