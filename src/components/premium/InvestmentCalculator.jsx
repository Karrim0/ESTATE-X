import { useState, useMemo } from "react";
import { TrendingUp, DollarSign, Calendar, Percent } from "lucide-react";

/**
 * InvestmentCalculator Component - Premium Feature
 * Calculates ROI for investment properties
 */

const InvestmentCalculator = ({ propertyPrice, formatPrice }) => {
  const [monthlyRent, setMonthlyRent] = useState(3500);
  const [occupancyRate, setOccupancyRate] = useState(95);
  const [annualExpenses, setAnnualExpenses] = useState(8000);
  const [appreciationRate, setAppreciationRate] = useState(3);

  // Calculations
  const analysis = useMemo(() => {
    // Annual rental income (adjusted for occupancy)
    const annualGrossIncome = monthlyRent * 12 * (occupancyRate / 100);
    const annualNetIncome = annualGrossIncome - annualExpenses;

    // ROI Calculation
    const roi = (annualNetIncome / propertyPrice) * 100;

    // Cash-on-Cash Return (assuming 20% down payment)
    const downPayment = propertyPrice * 0.2;
    const cashOnCashReturn = (annualNetIncome / downPayment) * 100;

    // Break-even calculation
    const breakEvenYears = propertyPrice / annualNetIncome;

    // Property value projection (5 years)
    const futureValue5Y =
      propertyPrice * Math.pow(1 + appreciationRate / 100, 5);
    const totalGain5Y = futureValue5Y - propertyPrice + annualNetIncome * 5;

    // Monthly metrics
    const monthlyNetIncome = annualNetIncome / 12;
    const monthlyExpenses = annualExpenses / 12;

    return {
      annualGrossIncome,
      annualNetIncome,
      roi,
      cashOnCashReturn,
      breakEvenYears,
      futureValue5Y,
      totalGain5Y,
      monthlyNetIncome,
      monthlyExpenses,
      downPayment,
    };
  }, [
    propertyPrice,
    monthlyRent,
    occupancyRate,
    annualExpenses,
    appreciationRate,
  ]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 border-2 border-emerald-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-600 rounded-xl">
          <TrendingUp className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Investment Analysis
          </h3>
          <p className="text-sm text-gray-600">
            Calculate your potential returns
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {/* Annual ROI */}
        <div className="bg-white rounded-xl p-5 border-2 border-emerald-300 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Percent size={18} className="text-emerald-600" />
            <div className="text-xs font-semibold text-gray-600 uppercase">
              Annual ROI
            </div>
          </div>
          <div
            className={`text-3xl font-bold ${
              analysis.roi > 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {analysis.roi.toFixed(2)}%
          </div>
        </div>

        {/* Cash-on-Cash */}
        <div className="bg-white rounded-xl p-5 border-2 border-emerald-300 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} className="text-emerald-600" />
            <div className="text-xs font-semibold text-gray-600 uppercase">
              Cash-on-Cash
            </div>
          </div>
          <div
            className={`text-3xl font-bold ${
              analysis.cashOnCashReturn > 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {analysis.cashOnCashReturn.toFixed(2)}%
          </div>
        </div>

        {/* Break-Even */}
        <div className="bg-white rounded-xl p-5 border-2 border-emerald-300 shadow-md col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-emerald-600" />
            <div className="text-xs font-semibold text-gray-600 uppercase">
              Break-Even
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {analysis.breakEvenYears.toFixed(1)}{" "}
            <span className="text-lg font-normal text-gray-600">yrs</span>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="space-y-6 mb-6">
        {/* Monthly Rent */}
        <div>
          <label className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">
              Expected Monthly Rent
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {formatPrice(monthlyRent)}
            </span>
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider-green"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$1,000/mo</span>
            <span>$10,000/mo</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div>
          <label className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">Occupancy Rate</span>
            <span className="text-lg font-bold text-emerald-600">
              {occupancyRate}%
            </span>
          </label>
          <input
            type="range"
            min="70"
            max="100"
            step="5"
            value={occupancyRate}
            onChange={(e) => setOccupancyRate(Number(e.target.value))}
            className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider-green"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>70%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Annual Expenses */}
        <div>
          <label className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">Annual Expenses</span>
            <span className="text-lg font-bold text-red-600">
              {formatPrice(annualExpenses)}
            </span>
          </label>
          <input
            type="range"
            min="2000"
            max="20000"
            step="500"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
            className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider-green"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$2,000/yr</span>
            <span>$20,000/yr</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Includes: Maintenance, Property Tax, Insurance, HOA fees
          </p>
        </div>

        {/* Appreciation Rate */}
        <div>
          <label className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">
              Annual Appreciation
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {appreciationRate}%
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={appreciationRate}
            onChange={(e) => setAppreciationRate(Number(e.target.value))}
            className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider-green"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>10%</span>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-xl p-6 border-2 border-emerald-300 space-y-4">
        <h4 className="font-bold text-gray-900 text-lg mb-4">
          Monthly Cash Flow
        </h4>

        <div className="flex justify-between items-center">
          <span className="text-gray-700">Rental Income</span>
          <span className="font-bold text-green-600">
            +{formatPrice(monthlyRent * (occupancyRate / 100))}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700">Monthly Expenses</span>
          <span className="font-bold text-red-600">
            -{formatPrice(analysis.monthlyExpenses)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
          <span className="font-bold text-gray-900 text-lg">
            Net Monthly Profit
          </span>
          <span
            className={`font-bold text-2xl ${
              analysis.monthlyNetIncome > 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {formatPrice(analysis.monthlyNetIncome)}
          </span>
        </div>
      </div>

      {/* 5-Year Projection */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-6 mt-6 border-2 border-emerald-300">
        <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          📈 5-Year Projection
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Property Value (Year 5)</span>
            <span className="font-bold text-gray-900">
              {formatPrice(analysis.futureValue5Y)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Appreciation Gain</span>
            <span className="font-bold text-green-600">
              +{formatPrice(analysis.futureValue5Y - propertyPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Rental Income</span>
            <span className="font-bold text-green-600">
              +{formatPrice(analysis.annualNetIncome * 5)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t-2 border-emerald-300">
            <span className="font-bold text-gray-900">
              Total Projected Gain
            </span>
            <span className="font-bold text-2xl text-emerald-600">
              {formatPrice(analysis.totalGain5Y)}
            </span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
        * Projections are estimates based on your inputs and historical
        averages. Actual results may vary.
      </p>

      {/* CSS for Slider */}
      <style jsx>{`
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }
        .slider-green::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
        }
        .slider-green::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }
        .slider-green::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
        }
      `}</style>
    </div>
  );
};

export default InvestmentCalculator;
