import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Calculator, Info } from 'lucide-react';

/**
 * MortgageCalculator Component - Premium Feature
 * Calculates monthly mortgage payments with interactive sliders
 */

const MortgageCalculator = ({ propertyPrice, formatPrice }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(3.5);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculations
  const calculations = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Monthly payment formula
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    // Property tax estimate (1.2% annually)
    const annualPropertyTax = propertyPrice * 0.012;
    const monthlyPropertyTax = annualPropertyTax / 12;
    
    // HOA/Insurance estimate ($200/month)
    const monthlyInsurance = 200;
    
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance;

    return {
      downPayment,
      loanAmount,
      monthlyPayment: monthlyPayment || 0,
      totalMonthlyPayment,
      totalPayment,
      totalInterest,
      monthlyPropertyTax,
      monthlyInsurance
    };
  }, [propertyPrice, downPaymentPercent, loanTerm, interestRate]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border-2 border-blue-200 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl">
            <Calculator className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Mortgage Calculator</h3>
            <p className="text-sm text-gray-600">Estimate your monthly payment</p>
          </div>
        </div>
      </div>

      {/* Main Result */}
      <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-300 shadow-md">
        <div className="text-sm text-gray-600 mb-2">Estimated Monthly Payment</div>
        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
          {formatPrice(calculations.totalMonthlyPayment)}
          <span className="text-lg text-gray-500 font-normal">/mo</span>
        </div>
        
        {/* Quick Breakdown */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-500 mb-1">Principal & Interest</div>
            <div className="font-bold text-gray-900">{formatPrice(calculations.monthlyPayment)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Property Tax</div>
            <div className="font-bold text-gray-900">{formatPrice(calculations.monthlyPropertyTax)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Insurance</div>
            <div className="font-bold text-gray-900">{formatPrice(calculations.monthlyInsurance)}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        
        {/* Down Payment */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold text-gray-900">Down Payment</label>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-blue-600">{downPaymentPercent}%</span>
              <span className="text-sm text-gray-600">({formatPrice(calculations.downPayment)})</span>
            </div>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold text-gray-900">Loan Term</label>
            <span className="text-lg font-bold text-blue-600">{loanTerm} years</span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="5"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10 years</span>
            <span>30 years</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold text-gray-900">Interest Rate</label>
            <span className="text-lg font-bold text-blue-600">{interestRate.toFixed(2)}%</span>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2%</span>
            <span>8%</span>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full mt-6 py-3 bg-white border-2 border-blue-300 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <Info size={18} />
        {showBreakdown ? 'Hide' : 'Show'} Detailed Breakdown
      </button>

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <div className="mt-6 space-y-4 bg-white rounded-xl p-6 border-2 border-blue-200 animate-in slide-in-from-top">
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Property Price</span>
            <span className="font-bold text-gray-900">{formatPrice(propertyPrice)}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Down Payment ({downPaymentPercent}%)</span>
            <span className="font-bold text-green-600">-{formatPrice(calculations.downPayment)}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b-2 border-gray-300">
            <span className="font-semibold text-gray-700">Loan Amount</span>
            <span className="font-bold text-gray-900">{formatPrice(calculations.loanAmount)}</span>
          </div>

          <div className="pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Interest Paid</span>
              <span className="font-semibold text-red-600">{formatPrice(calculations.totalInterest)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount Paid</span>
              <span className="font-semibold text-gray-900">{formatPrice(calculations.totalPayment)}</span>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="mt-6">
            <div className="text-sm font-semibold text-gray-700 mb-2">Payment Breakdown</div>
            <div className="h-12 flex rounded-xl overflow-hidden">
              <div 
                className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(calculations.monthlyPayment / calculations.totalMonthlyPayment) * 100}%` }}
              >
                P&I
              </div>
              <div 
                className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(calculations.monthlyPropertyTax / calculations.totalMonthlyPayment) * 100}%` }}
              >
                Tax
              </div>
              <div 
                className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(calculations.monthlyInsurance / calculations.totalMonthlyPayment) * 100}%` }}
              >
                Ins.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
        * This is an estimate. Actual rates and payments may vary. Consult with a financial advisor for accurate calculations.
      </p>

      {/* CSS for Slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
      `}</style>
    </div>
  );
};

export default MortgageCalculator;