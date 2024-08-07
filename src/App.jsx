import { useEffect, useState } from "react";
import InputBox from "./Components/InputBox";
import useRates from "./hooks/useRates";

function App() {
  // i want this url to always get me the exchanges when i call it
  //let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

  const [fromCur, setFromCur] = useState("inr");
  const [toCur, setToCur] = useState("usd");

  const [givenAmountValue, setGivenAmountValue] = useState(0);
  const [calculatedAmountValue, setCalculatedAmountValue] = useState(0);
  
  const swap = () => {
    let tempgivenamt = givenAmountValue;
    setFromCur(toCur);
    setToCur(fromCur);
    setGivenAmountValue(calculatedAmountValue);
    setCalculatedAmountValue(tempgivenamt); // it still hasn't changed yet so i can just use this directly here as the value of the state gets changed after re-render, and before re-rendering it'll first read all this 
  };


  const exchangeRates = useRates(fromCur);

  const allCurrencies = Object.keys(exchangeRates);

  
  const conversion = () => {
    setCalculatedAmountValue(givenAmountValue * exchangeRates[toCur])
  }
  

  return (
    <>
      <div
        id="background"
        className="fixed inset-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div
          id="card"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-4 rounded-xl"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              conversion();
            }}
            className="flex flex-col gap-6 "
          >
            <InputBox toOrFrom="To" defaultCurrency={fromCur} allCurrencies={allCurrencies} onCurrencyChange={(e) => setFromCur(e.target.value)} amount={givenAmountValue} onAmountChange={(e) => setGivenAmountValue(e.target.value)}/>

            <button
              onClick={swap}
              className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-3/4 bg-blue-700 text-white px-2 py-1 border-2 border-white rounded-lg"
            >
              Swap
            </button>

            <InputBox toOrFrom="From" defaultCurrency={toCur} allCurrencies={allCurrencies} onCurrencyChange={(e) => setToCur(e.target.value)} amount={calculatedAmountValue} onAmountChange={(e) => setCalculatedAmountValue(e.target.value)} amountDisable={true}/>

            <button className="bg-blue-700 text-white p-4 rounded-lg">
              Convert {fromCur.toUpperCase()} to {toCur.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
