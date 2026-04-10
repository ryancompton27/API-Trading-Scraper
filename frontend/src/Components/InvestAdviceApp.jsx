import { useNavigate } from "react-router-dom"

export default function InvestAdviceApp() {
    const navigate = useNavigate()

    return (
        <div>
        
        <div className="topnav">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/advice")}>Advice</button>
            <button onClick={() => navigate("/stocks")}>Stocks</button>
        </div>
    

    

            <h1>Welcome to our platform</h1>

            <div>
                <h2>about us</h2>

                <h3>our goal is to deliver a easy to use and well made trading platform that allows
                    new users to trade with ease and peace of mind.
                </h3>

            </div>

            <h1>Home Page</h1>
            
        </div>
        
    )


}