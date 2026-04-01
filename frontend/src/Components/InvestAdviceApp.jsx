import BeginnerAdviceApp from './BeginnerAdvicePage'
import InvestAdviceStocks from './InvestAdviceStocks'
//import { useNavigate } from "react-router-dom"

export default function InvestAdviceApp() {
 //   const navigate = useNavigate();
    
    return (
        
        <div>
            <div class="topnav">
                <button /*onClick={() => navigate(<InvestAdviceApp />)}*/ class="active">Home</button>
                <button /*onClick={navigate(<BeginnerAdviceApp />)}*/>Advice</button>
                <button onClick={<InvestAdviceStocks />}>Stocks</button>
               
            </div>
            <h1>Welcome to our platform</h1>

            <div>
                <h2>about us</h2>

                <h3>our goal is to deliver a easy to use and well made trading platform that allows
                    new users to trade with ease and peace of mind.
                </h3>

            </div>

        </div>
    )


}