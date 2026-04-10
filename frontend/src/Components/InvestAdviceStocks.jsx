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
import Navbar from "./Navbar";

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
    
    <div class="stock-research-page">
      < Navbar />
        <div class="stock-research-title">
        	<h1>Stocks Research Page</h1>
    	</div>
        
        <div class="stock-research-blurb">
        	<h3>This page is to provide you the latest information</h3>
            <h3>on the stocks you search.</h3>
            <h3>Type in the search bar below to begin.</h3>
        </div>
        
        <textarea
            rows="8"
            cols="60"
            placeholder="Enter stock information here..."
            value={stockData}
            onChange={(e) => setStockData(e.target.value)}
        />
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
        
        <div class="stock-research-blurb">
        	<h4>A reminder that the findings from your search above are there to help you learn, and do not take the place of professional adivce.</h4>
            <h4>Our goal here is simple - to have you leave this site with more knowledge then before on what investing is and</h4>
            <h4>why you might want to begin investing. We hope this helps you in your research!</h4>
            <br/>
        </div>
  	</div>
    
    //The code below was added by Ahmad I incorporated it above and the below can be deleted when finalizing this page/ensuring it
    //is fully functional with the search options from the API/WEB Scraper work. I just didn't want to risk deleting before in 
    //case I had missed carrying any of it that may be important into the above page for our stocks research.
    //     <br/>
    //     <br/>
    //     <br/>
    //   <h1>Stock Info / Advising Page</h1>

    //   <textarea
    //     rows="8"
    //     cols="60"
    //     placeholder="Enter stock information here..."
    //     value={stockData}
    //     onChange={(e) => setStockData(e.target.value)}
    //   />

    //   <br />
    //   <br />

    //   <button onClick={handleAnalyze}>Analyze Stock</button>

    //   <br />
    //   <br />

    //   {loading && <p>Analyzing stock data...</p>}

    //   {error && (
    //     <p>
    //       <strong>{error}</strong>
    //     </p>
    //   )}

    //   {result && (
    //     <div>
    //       <h2>AI Result</h2>
    //       <p style={{ whiteSpace: "pre-line" }}>{result}</p>
    //     </div>
    //   )}
    
  );
}
