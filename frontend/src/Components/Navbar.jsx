import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <div>
        
        <div className="topnav">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/advice")}>Advice</button>
            <button onClick={() => navigate("/stocks")}>Stocks</button>
        </div>



        </div>

    )}
