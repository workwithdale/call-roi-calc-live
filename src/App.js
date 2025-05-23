import React, { useState, useEffect } from 'react';

export default function App() {
  const [missedCalls, setMissedCalls] = useState("15");
  const [averageValue, setAverageValue] = useState("500");
  const [conversionRate, setConversionRate] = useState("30");
  const [setupFee, setSetupFee] = useState("1497");
  const [monthlyPrice, setMonthlyPrice] = useState("597");

  const [monthlyCallsMissed, setMonthlyCallsMissed] = useState(0);
  const [potentialClientsMonthly, setPotentialClientsMonthly] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);
  const [monthlyROI, setMonthlyROI] = useState(0);
  const [yearlyROI, setYearlyROI] = useState(0);
  const [firstMonthROI, setFirstMonthROI] = useState(0);
  const [netMonthlyRevenue, setNetMonthlyRevenue] = useState(0);
  const [netYearlyRevenue, setNetYearlyRevenue] = useState(0);
  const [breakEvenClients, setBreakEvenClients] = useState(0);

  useEffect(() => {
    const m = parseFloat(missedCalls) || 0;
    const a = parseFloat(averageValue) || 0;
    const c = parseFloat(conversionRate) || 0;
    const s = parseFloat(setupFee) || 0;
    const monthly = parseFloat(monthlyPrice) || 0;

    const weeksPerMonth = 4.33;
    const potentialCallsMonthly = m * weeksPerMonth;
    const convertedCallsMonthly = potentialCallsMonthly * (c / 100);
    const grossMonthlyRevenue = convertedCallsMonthly * a;
    const grossYearlyRevenue = grossMonthlyRevenue * 12;

    const firstMonthCosts = monthly + s;
    const firstMonthNetRevenue = grossMonthlyRevenue - firstMonthCosts;
    const firstMonthROI = (firstMonthNetRevenue / firstMonthCosts) * 100;

    const ongoingMonthlyNet = grossMonthlyRevenue - monthly;
    const ongoingMonthlyROI = (ongoingMonthlyNet / monthly) * 100;

    const firstYearCosts = (monthly * 12) + s;
    const firstYearNetRevenue = grossYearlyRevenue - firstYearCosts;
    const firstYearROI = (firstYearNetRevenue / firstYearCosts) * 100;

    const breakEven = a > 0 ? monthly / a : 0;

    setMonthlyCallsMissed(Math.round(potentialCallsMonthly));
    setPotentialClientsMonthly(Math.round(convertedCallsMonthly));
    setMonthlyRevenue(grossMonthlyRevenue);
    setYearlyRevenue(grossYearlyRevenue);
    setNetMonthlyRevenue(ongoingMonthlyNet);
    setNetYearlyRevenue(firstYearNetRevenue);
    setMonthlyROI(ongoingMonthlyROI);
    setYearlyROI(firstYearROI);
    setFirstMonthROI(firstMonthROI);
    setBreakEvenClients(breakEven);
  }, [missedCalls, averageValue, conversionRate, setupFee, monthlyPrice]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  const inputStyle = "w-full border px-3 py-2 rounded";
  const valueBoxStyle = "w-full border px-3 py-2 rounded bg-gray-100";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">AI Help Desk ROI Calculator</h1>
      <p className="text-gray-600 text-center mb-8">Discover the revenue you’re missing from unanswered calls — and what it could mean for your business.</p>

      <div id="report">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">📊 Enter Your Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Missed Calls Per Week", value: missedCalls, onChange: setMissedCalls },
              { label: "Avg Value Per Customer ($)", value: averageValue, onChange: setAverageValue },
              { label: "Conversion Rate (%)", value: conversionRate, onChange: setConversionRate },
            ].map(({ label, value, onChange }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="screen-only">
                  <input type="text" inputMode="numeric" value={value} onChange={e => onChange(e.target.value)} className={inputStyle} />
                </div>
                <div className="pdf-only">
                  <div className={valueBoxStyle}>{value}</div>
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Subscription</label>
              <div className="screen-only">
                <select value={monthlyPrice} onChange={e => setMonthlyPrice(e.target.value)} className={inputStyle}>
                  {["97","197","297","397","497","597","697","797","897","997","1097"].map(p => (
                    <option key={p} value={p}>${p}</option>
                  ))}
                </select>
              </div>
              <div className="pdf-only">
                <div className={valueBoxStyle}>${monthlyPrice}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">One-Time Setup Fee ($)</label>
              <div className="screen-only">
                <input type="text" inputMode="numeric" value={setupFee} onChange={e => setSetupFee(e.target.value)} className={inputStyle} />
              </div>
              <div className="pdf-only">
                <div className={valueBoxStyle}>{setupFee}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">📈 Your Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Monthly Missed Calls</h4><p className="text-xl font-semibold text-blue-700">{monthlyCallsMissed}</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Potential New Clients</h4><p className="text-xl font-semibold text-blue-700">{potentialClientsMonthly}</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Monthly Revenue Missed</h4><p className="text-xl font-semibold text-green-700">{formatCurrency(monthlyRevenue)}</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Annual Revenue Missed</h4><p className="text-xl font-semibold text-green-700">{formatCurrency(yearlyRevenue)}</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">First Month ROI</h4><p className={`text-xl font-semibold ${firstMonthROI >= 0 ? 'text-green-700' : 'text-red-600'}`}>{firstMonthROI.toFixed(0)}%</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Monthly ROI</h4><p className={`text-xl font-semibold ${monthlyROI >= 0 ? 'text-green-700' : 'text-red-600'}`}>{monthlyROI.toFixed(0)}%</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Yearly ROI</h4><p className={`text-xl font-semibold ${yearlyROI >= 0 ? 'text-green-700' : 'text-red-600'}`}>{yearlyROI.toFixed(0)}%</p></div>
            <div className="bg-white p-4 rounded shadow"><h4 className="text-sm text-gray-600">Break-Even Clients/Month</h4><p className="text-xl font-semibold text-blue-700">{breakEvenClients.toFixed(1)}</p></div>
          </div>
        </div>
      </div>

    </div>
  );
}
