import { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
