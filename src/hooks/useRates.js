// if your module is not returning any jsx then don't use .jsx extension
import React, { useEffect, useState } from "react";

export default function useRates(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((response) => response.json())
      .then((res) => setData(res[currency]));
  }, [currency]);

  return data;
}

//If you don't use useState:
// Initial Render: When the component first renders, it calls useRates(fromCur). The fetch function starts the asynchronous operation, but data is returned immediately as an empty object {}.
// Fetch Completion: Once the fetch operation completes, it updates the data variable inside the then block. However, this does not trigger a re-render of the component because the component does not "know" that data has changed.
// Stale Data: The component continues to render with the initial empty data state, and you won't see the fetched data in the UI. Any changes to the currency won't automatically re-trigger the fetch operation correctly.
//Hence, we need to use useState but it still won't run as it will get stuck in an infinite fetch loop

// So, we need to use useEffect as well

// If i DON'T use useEffect:

// because when you change the state of data it re-renders the whole component AGAIN!
// and then data again gets initialized to empty object and During this re-render, useRates is called again.
// The fetch operation starts again because it's not inside an effect.
// useRates returns the initial data (empty object) again before the fetch complete and gets stuck inside a loop

// If i DO use useEffect:

// During this re-render, useRates is called again.
// useEffect does not run again because currency has not changed.
// The component uses the updated data from the state and renders with the fetched data.
