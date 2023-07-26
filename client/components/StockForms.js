// StockForm.js
import React, { useState } from 'react';

const StockForm = ({ onSubmit }) => {
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ symbol, date });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Stock Symbol:
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StockForm;

