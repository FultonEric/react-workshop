import { useState } from "react";
import "./App.css";

function App() {
  // State hooks
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("15");
  const [output, setOutput] = useState("");

  // Mortgage formula calculation
  const calculatePayment = (balance, rate, term) => {
    if (!balance || !rate || !term) {
      setOutput("Please fill out all fields.");
      return;
    }

    const P = parseFloat(balance);
    const annualRate = parseFloat(rate) / 100;
    const r = annualRate / 12; // monthly interest
    const n = parseInt(term) * 12; // number of months

    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    const M = P * (numerator / denominator);

    if (isNaN(M)) {
      setOutput("Invalid input. Try again.");
    } else {
      setOutput(`$${M.toFixed(2)} is your payment`);
    }
  };

  return (
    <>
      <h1>Mortgage Calculator</h1>

      <div className="form-group">
        <label>Loan Balance ($)</label>
        <input
          type="number"
          data-testid="balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          data-testid="rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Loan Term (years)</label>
        <select
          data-testid="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        >
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
      </div>

      <button
        data-testid="submit"
        onClick={() => calculatePayment(balance, rate, term)}
      >
        Calculate
      </button>

      <div id="output" data-testid="output">
        {output}
      </div>
    </>
  );
}

export default App;
