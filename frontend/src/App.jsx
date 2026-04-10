import './App.css'
import { Routes, Route } from "react-router-dom"
import InvestAdviceApp from "./Components/InvestAdviceApp"
import BeginnerAdviceApp from "./Components/BeginnerAdvicePage"
import InvestAdviceStocks from "./Components/InvestAdviceStocks"
import BeginnerAdviceApp from './Components/BeginnerAdvicePage'
import InvestAdviceApp from './Components/InvestAdviceApp'
import InvestAdviceStocks from './Components/InvestAdviceStocks'

function App() {

  return (
    <>
      <div>
        
        <Routes>
        <Route path="/" element={<InvestAdviceApp />} />
        <Route path="/advice" element={<BeginnerAdviceApp />} />
        <Route path="/stocks" element={<InvestAdviceStocks />} />
      </Routes>
        {/*<InvestAdviceApp />*/}
        {/*<BeginnerAdviceApp />*/}
        <InvestAdviceStocks />
      </div>
    </>
  )
}
export default App