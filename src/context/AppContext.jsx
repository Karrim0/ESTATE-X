import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CurrencyContext = createContext();
const FormatContext = createContext();

const EXCHANGE_RATES = {
  USD: 1,
  EGP: 50.5,
  SAR: 3.75,
  AED: 3.67,
  EUR: 0.92,
  GBP: 0.79
};

const CURRENCY_SYMBOLS = {
  USD: '$',
  EGP: 'ج.م',
  SAR: 'ر.س',
  AED: 'د.إ',
  EUR: '€',
  GBP: '£'
};

export const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('app_currency') || 'USD';
    } catch {
      return 'USD';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app_currency', currency);
    } catch (error) {
      console.warn('Failed to save currency preference:', error);
    }
  }, [currency]);

  const currencyValue = useMemo(() => ({
    currency,
    setCurrency,
    availableCurrencies: Object.keys(EXCHANGE_RATES),
    exchangeRates: EXCHANGE_RATES
  }), [currency]);

  const formatValue = useMemo(() => {
    const rate = EXCHANGE_RATES[currency] || 1;
    
    return {
      formatPrice: (priceInUSD) => {
        if (typeof priceInUSD !== 'number') {
          console.warn('Invalid price provided:', priceInUSD);
          return 'N/A';
        }

        const converted = priceInUSD * rate;
        
        return new Intl.NumberFormat(
          currency === 'EGP' || currency === 'SAR' || currency === 'AED' ? 'ar-EG' : 'en-US',
          {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
          }
        ).format(converted);
      },

      formatPriceCompact: (priceInUSD) => {
        if (typeof priceInUSD !== 'number') return 'N/A';

        const converted = priceInUSD * rate;
        
        return new Intl.NumberFormat(
          currency === 'EGP' || currency === 'SAR' || currency === 'AED' ? 'ar-EG' : 'en-US',
          {
            style: 'currency',
            currency: currency,
            notation: 'compact',
            maximumFractionDigits: 1
          }
        ).format(converted);
      },

      convertPrice: (priceInUSD) => {
        return priceInUSD * rate;
      },

      getCurrencySymbol: () => {
        return CURRENCY_SYMBOLS[currency] || currency;
      }
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={currencyValue}>
      <FormatContext.Provider value={formatValue}>
        {children}
      </FormatContext.Provider>
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within AppProvider');
  }
  return context;
};

export const useFormat = () => {
  const context = useContext(FormatContext);
  if (!context) {
    throw new Error('useFormat must be used within AppProvider');
  }
  return context;
};

export const useAppContext = () => {
  const currencyContext = useCurrency();
  const formatContext = useFormat();
  
  return {
    ...currencyContext,
    ...formatContext
  };
};

export { CurrencyContext, FormatContext };