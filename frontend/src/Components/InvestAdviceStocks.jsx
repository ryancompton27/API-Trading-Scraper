/*
import { useEffect, useState } from "react"

export default function InvestAdviceStocks() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/analysis")
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    return (
        <div>
            <h1>Stock Info / Advising Page</h1>

            {data.map((item) => (
                <div key={item.id}>
                    <p>{item.summary}</p>
                    <p><strong>{item.recommendation}</strong></p>
                </div>
            ))}
        </div>
    )
}
*/

import { useState } from "react";

export default function InvestAdviceStocks() {
  const [stockData, setStockData] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (stockData.trim() === "") {
      setError("Please enter some stock information first.");
      setResult("");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: stockData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.result);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Stock Info / Advising Page</h1>

      <textarea
        rows="8"
        cols="60"
        placeholder="Enter stock information here..."
        value={stockData}
        onChange={(e) => setStockData(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAnalyze}>Analyze Stock</button>

      <br />
      <br />

      {loading && <p>Analyzing stock data...</p>}

      {error && (
        <p>
          <strong>{error}</strong>
        </p>
      )}

      {result && (
        <div>
          <h2>AI Result</h2>
          <p style={{ whiteSpace: "pre-line" }}>{result}</p>
        </div>
      )}
    </div>
  );
}
