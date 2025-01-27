import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
    currentLanguage: string;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const toggleLanguage = () => {
        const newLang = currentLanguage === 'en' ? 'fa' : 'en';
        i18n.changeLanguage(newLang);
        setCurrentLanguage(newLang);
        document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguageContext must be used within a LanguageProvider');
    }
    return context;
};
