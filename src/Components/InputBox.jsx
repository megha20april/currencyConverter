import React from 'react'

function InputBox({ 
  toOrFrom,
  defaultCurrency,
  allCurrencies = [],
  onCurrencyChange,
  amount,
  onAmountChange,
  amountDisable = false //this is because in the result input i want to make it readOnly
 }) {




  return (
    <div className='flex gap-20 bg-white p-6 rounded-xl '>
      <div id="left-div" className='flex flex-col gap-4'>
        <label className='text-gray-400'>{toOrFrom}</label>

        {/* to be able to access this value we used a state and then to be able to change it we'll have to pass and onChange function as well */}

        {/* this step attribute is used to allow decimal values */}
        <input type="number" step="any" value={amount} onChange={onAmountChange} min='0' className='focus:outline-none'disabled={amountDisable}/>
      </div>
      <div id="right-div" className='flex flex-col gap-4'>
        <label className='text-gray-400'>Currency type</label>

        {/* i have made a default value here, but to be able to change it i'll have to give it an onChange function as well,
        that will just set the "to" or "from" currency value to the selected value from the select tag using e.target.value*/}
        <select value={defaultCurrency} onChange={onCurrencyChange} className='bg-gray-900 bg-opacity-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 '>
            
            {allCurrencies.map((item, index) => (
                <option key={index} value={item}>{item}</option>)
            )}
        </select>
      </div>
    </div>
  )
}

export default InputBox;
