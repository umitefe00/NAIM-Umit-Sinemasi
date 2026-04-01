import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { Locale, dict } from '../i18n/translations';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface Movie {
  id: string;
  title: string;
  timestamp: number;
  thumbnail?: string;
  rating?: string;
}

interface AppState {
  watchlist: Movie[];
  theme: 'light' | 'dark';
  language: Locale;
  // actions
  addMovie: (movieData: Omit<Movie, 'id' | 'timestamp'>) => void;
  removeMovie: (id: string) => void;
  clearQueue: () => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  // translation helper
  t: typeof dict.en;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Locale>('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem('@watchlist');
        const storedTheme = await AsyncStorage.getItem('@theme');
        const storedLang = await AsyncStorage.getItem('@language');

        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
        if (storedTheme) setTheme(storedTheme as 'light' | 'dark');
        if (storedLang) setLanguage(storedLang as Locale);
      } catch (e) {
        console.error('Failed to load state', e);
      } finally {
        setIsReady(true);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('@watchlist', JSON.stringify(watchlist));
        await AsyncStorage.setItem('@theme', theme);
        await AsyncStorage.setItem('@language', language);
      } catch (e) {
        console.error('Failed to save state', e);
      }
    };
    saveState();
  }, [watchlist, theme, language, isReady]);

  const addMovie = (movieData: Omit<Movie, 'id' | 'timestamp'>) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newMovie: Movie = {
      id: Date.now().toString() + Math.random().toString(),
      ...movieData,
      timestamp: Date.now(),
    };
    setWatchlist([newMovie, ...watchlist]);
  };

  const removeMovie = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  const clearQueue = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setWatchlist([]);
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'tr' : 'en');

  const t = dict[language];

  if (!isReady) return null; // Provide a short delay for state rehydration

  return (
    <AppContext.Provider value={{
      watchlist, theme, language, addMovie, removeMovie, clearQueue, toggleTheme, toggleLanguage, t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
