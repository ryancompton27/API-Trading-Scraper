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