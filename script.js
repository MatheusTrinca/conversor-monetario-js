const currencyEl_one = document.getElementById('currency-one')
const amountEl_one = document.getElementById('amount-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_two = document.getElementById('amount-two')
const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch all exchange rates and update DOM
function calculate (){

  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/86b11e8e7d3df96bc9940725/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currency_two]
      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`
      const value = (amountEl_one.value * rate).toFixed(2)
      amountEl_two.value = value;
    })
}

function swapCurrency() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp
  calculate();
}

currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)
swap.addEventListener('click', swapCurrency)


calculate()