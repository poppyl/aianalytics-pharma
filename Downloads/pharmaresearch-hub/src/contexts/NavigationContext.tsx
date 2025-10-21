import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSecondaryExpanded: boolean;
  toggleSecondary: () => void;
  setIsSecondaryExpanded: (expanded: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSecondaryExpanded, setIsSecondaryExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active section from current route
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/insights') || path.startsWith('/intelligence')) {
      setActiveSection('intelligence');
    } else if (path.startsWith('/knowledge') || path.startsWith('/library')) {
      setActiveSection('knowledge');
    } else if (path.startsWith('/tools')) {
      setActiveSection('tools');
    } else if (path.startsWith('/community')) {
      setActiveSection('community');
    } else if (path.startsWith('/settings')) {
      setActiveSection('settings');
    } else if (path === '/' || path.startsWith('/notifications') || path.startsWith('/quick-actions')) {
      setActiveSection('home');
    }
  }, [location.pathname]);

  const toggleSecondary = () => setIsSecondaryExpanded(prev => !prev);

  const handleSetActiveSection = (section: string) => {
    setActiveSection(section);
    // Navigate to default route for that section
    const sectionRoutes: Record<string, string> = {
      home: '/',
      tools: '/tools',
      intelligence: '/insights/horizon',
      knowledge: '/knowledge/data-sources',
      community: '/community/shared-with-me',
      settings: '/settings/profile',
    };
    navigate(sectionRoutes[section] || '/');
  };

  return (
    <NavigationContext.Provider value={{
      activeSection,
      setActiveSection: handleSetActiveSection,
      isSecondaryExpanded,
      toggleSecondary,
      setIsSecondaryExpanded,
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
