import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppMode, APP_CONFIGS, AppConfig } from '@/types/app';

interface AppContextType {
  currentMode: AppMode;
  config: AppConfig;
  switchApp: (mode: AppMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    const stored = sessionStorage.getItem('appMode');
    return (stored as AppMode) || 'pharma';
  });

  const config = APP_CONFIGS[currentMode];

  useEffect(() => {
    sessionStorage.setItem('appMode', currentMode);
    document.documentElement.style.setProperty('--app-accent', config.accentColor);
  }, [currentMode, config.accentColor]);

  const switchApp = (mode: AppMode) => {
    setCurrentMode(mode);
  };

  return (
    <AppContext.Provider value={{ currentMode, config, switchApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};
