"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, getTranslations, Translations } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "gamagori-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ["ja", "en", "zh", "pt"].includes(stored)) {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    // Update html lang attribute
    document.documentElement.lang = newLang;
  };

  const t = getTranslations(lang);

  // Prevent hydration mismatch by rendering default during SSR
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "ja", setLang, t: getTranslations("ja") }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
