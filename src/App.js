import React, { useState, useEffect } from 'react';

export default function App() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [averageValue, setAverageValue] = useState(500);
  const [conversionRate, setConversionRate] = useState(30);
  const [servicePrice] = useState(597);
  const [setupFee, setSetupFee] = useState(1497);

  const [monthlyCallsMissed, setMonthlyCallsMissed] = useState(0);
  const [potentialClientsMonthly, setPotentialClientsMonthly] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);
  const [monthlyROI, setMonthlyROI] = useState(0);
  const [yearlyROI, setYearlyROI] = useState(0);
  const [firstMonthROI, setFirstMonthROI] = useState(0);
  const [netMonthlyRevenue, setNetMonthlyRevenue] = useState(0);
  const [netYearlyRevenue, setNetYearlyRevenue] = useState(0);

  useEffect(() => {
    const weeksPerMonth = 4.33;
    const potentialCallsMonthly = missedCalls * weeksPerMonth;
    const convertedCallsMonthly = potentialCallsMonthly * (conversionRate / 100);
    const grossMonthlyRevenue = convertedCallsMonthly * averageValue;
    const grossYearlyRevenue = grossMonthlyRevenue * 12;

    const firstMonthCosts = servicePrice + setupFee;
    const firstMonthNetRevenue = grossMonthlyRevenue - firstMonthCosts;
    const firstMonthROI = (firstMonthNetRevenue / firstMonthCosts) * 100;

    const ongoingMonthlyNet = grossMonthlyRevenue - servicePrice;
    const ongoingMonthlyROI = (ongoingMonthlyNet / servicePrice) * 100;

    const firstYearCosts = (servicePrice * 12) + setupFee;
    const firstYearNetRevenue = grossYearlyRevenue - firstYearCosts;
    const firstYearROI = (firstYearNetRevenue / firstYearCosts) * 100;

    setMonthlyCallsMissed(Math.round(potentialCallsMonthly));
    setPotentialClientsMonthly(Math.round(convertedCallsMonthly));
    setMonthlyRevenue(grossMonthlyRevenue);
    setYearlyRevenue(grossYearlyRevenue);
    setNetMonthlyRevenue(ongoingMonthlyNet);
    setNetYearlyRevenue(firstYearNetRevenue);
    setMonthlyROI(ongoingMonthlyROI);
    setYearlyROI(firstYearROI);
    setFirstMonthROI(firstMonthROI);
  }, [missedCalls, averageValue, conversionRate, servicePrice, setupFee]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2b6cb0' }}>AI Call ROI Calculator</h1>
      <p style={{ textAlign: 'center', color: '#4a5568' }}>
        See how much revenue you're missing and the ROI of using our AI Answering Service.
      </p>

      <div style={{ background: '#ebf8ff', padding: '20px', borderRadius: '8px', marginTop: '30px' }}>
        <h3>Enter Your Information:</h3>

        <label>Missed Calls Per Week:</label>
        <input type="number" value={missedCalls} onChange={e => setMissedCalls(+e.target.value)} />

        <label>Average Value Per Customer ($):</label>
        <input type="number" value={averageValue} onChange={e => setAverageValue(+e.target.value)} />

        <label>Conversion Rate (% of answered calls that become customers):</label>
        <input type="number" value={conversionRate} onChange={e => setConversionRate(+e.target.value)} />

        <label>One-Time Setup Fee ($):</label>
        <input type="number" value={setupFee} onChange={e => setSetupFee(+e.target.value)} />
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Results:</h3>
        <p><strong>Monthly Missed Calls:</strong> {monthlyCallsMissed}</p>
        <p><strong>Potential New Clients Per Month:</strong> {potentialClientsMonthly}</p>
        <p><strong>Monthly Revenue You're Missing:</strong> {formatCurrency(monthlyRevenue)}</p>
        <p><strong>Annual Revenue You're Missing:</strong> {formatCurrency(yearlyRevenue)}</p>
        <p><strong>First Month ROI:</strong> {firstMonthROI.toFixed(0)}%</p>
        <p><strong>Ongoing Monthly ROI:</strong> {monthlyROI.toFixed(0)}%</p>
        <p><strong>Yearly ROI:</strong> {yearlyROI.toFixed(0)}%</p>
      </div>
    </div>
  );
}
