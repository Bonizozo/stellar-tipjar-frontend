'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createNamespacedStorage } from '@/lib/storage';

const storage = createNamespacedStorage('currency');

type CurrencyContextType = {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  useEffect(() => {
    const saved = storage.getString('currency', { legacyKey: 'user-fiat-preference' });
    if (saved) setSelectedCurrency(saved);
  }, []);

  const setCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    storage.setString('currency', currency);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
