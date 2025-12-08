// AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. إنشاء الـ Context
const AppContext = createContext();

// 2. تعريف أسعار الصرف (ثابتة كمثال)
const EXCHANGE_RATES = {
  USD: 1,
  EGP: 50.5, // سعر الدولار مقابل الجنيه
  SAR: 3.75  // سعر الدولار مقابل الريال
};

// 3. الـ Provider اللي هيغلف التطبيق كله
export const AppProvider = ({ children }) => {
  // بنجيب العملة من الـ LocalStorage لو موجودة، لو لا بنخليها USD
  const [currency, setCurrency] = useState(() => 
    localStorage.getItem('app_currency') || 'USD'
  );

  // كل ما العملة تتغير، نحفظها في الـ LocalStorage
  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  // دالة تحويل وتنسيق السعر
  const formatPrice = (priceInUSD) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = priceInUSD * rate;
    
    // تنسيق الرقم (مثلاً: 2,500,000 ج.م)
    return new Intl.NumberFormat(currency === 'EGP' || currency === 'SAR' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0, // مش عايزين كسور عشرية
    }).format(converted);
  };

  return (
    <AppContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </AppContext.Provider>
  );
};

// 4. Custom Hook عشان نستخدم الكونتكس بسهولة في أي مكان
export const useAppContext = () => useContext(AppContext);
