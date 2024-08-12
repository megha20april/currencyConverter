import { useEffect, useState } from "react";
import InputBox from "./Components/InputBox";
import useRates from "./hooks/useRates";
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';

function App() {
  // i want this url to always get me the exchanges when i call it
  //let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

  const [fromCur, setFromCur] = useState("usd");
  const [toCur, setToCur] = useState("inr");

  const [givenAmountValue, setGivenAmountValue] = useState(0);
  const [calculatedAmountValue, setCalculatedAmountValue] = useState(0);

  const exchangeRates = useRates(fromCur);

  const allCurrencies = Object.keys(exchangeRates);

  const swap = () => {
    setFromCur(toCur);
    setToCur(fromCur);
    setCalculatedAmountValue(givenAmountValue);
    // it still hasn't changed yet so i can just use this directly here as the value of the state gets changed after re-render, and before re-rendering it'll first read all this
    setGivenAmountValue(calculatedAmountValue);
  };

  const conversion = () => {
    setCalculatedAmountValue(givenAmountValue * exchangeRates[toCur]);
  };

  return (
    <>
      <div
        id="background"
        className="flex fixed inset-0 justify-center items-center"
      >
        <div className="relative flex flex-col gap-6 justify-center items-start p-8 bg-gradient-to-r from-cyan-500 to-blue-500 w-1/3 h-full">
          <h1 className="text-white text-6xl font-bold font-Manrope">
            Currency
          </h1>
          <h1 className="text-white text-6xl font-bold -mt-5 ml-2 font-Manrope">
          <SwapVerticalCircleIcon fontSize="large" />
            <span className="ml-2">Converter</span>
          </h1>

          <p className="text-blue-200 text-justify">
            Convert currencies effortlessly with our user-friendly currency
            converter. Get real-time exchange rates, swap between currencies,
            and see instant results with just a few clicks.
          </p>
        </div>

        <div
          className="h-full relative w-2/3"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          }}
        >
          <div
            id="card"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-4 rounded-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                conversion();
              }}
              className="flex flex-col gap-6 "
            >
              <InputBox
                toOrFrom="To"
                defaultCurrency={fromCur}
                allCurrencies={allCurrencies}
                onCurrencyChange={(e) => setFromCur(e.target.value)}
                amount={givenAmountValue}
                onAmountChange={(e) => setGivenAmountValue(e.target.value)}
              />

              <button
                onClick={swap}
                className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-3/4 bg-blue-700 text-white px-2 py-1 border-2 border-white rounded-lg"
              >
                <SwapVerticalCircleIcon />
              </button>

              <InputBox
                toOrFrom="From"
                defaultCurrency={toCur}
                allCurrencies={allCurrencies}
                onCurrencyChange={(e) => setToCur(e.target.value)}
                amount={calculatedAmountValue}
                onAmountChange={(e) => setCalculatedAmountValue(e.target.value)}
                amountDisable
              />

              <button className="bg-blue-700 text-white p-4 rounded-lg">
                Convert {fromCur.toUpperCase()} to {toCur.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
