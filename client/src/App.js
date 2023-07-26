// App.js
import React, { useState } from 'react';
import './App.css';
import StockForm from './components/StockForm';

function App() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/fetchStockData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }

      const data = await response.json();
      setStockData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Stock Trade Statistics</h1>
      <StockForm onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {stockData && (
        <div>
          <h2>Stock Trade Statistics</h2>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </div>
  );
}

export default App;
