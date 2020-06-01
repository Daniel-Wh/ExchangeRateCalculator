// setting dom elements that will be dynamic
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

/**
 * GLobal state object
 */
const state = {
  rates: [],
  currencyOne: "",
  currencyTwo: "",
  amountOne: 0,
  amountTwo: 0,
};

/**
 * Calculate exhange rate and update UI to reflect change
 */
function calculate() {
  state.currencyOne = currencyEl_one.value;
  state.currencyTwo = currencyEl_two.value;
  const rate = state.rates[state.currencyTwo];
  rateEl.innerText = `1 ${state.currencyOne} = ${rate} ${state.currencyTwo}`;
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
}

/**
 * Fetch exchange rates array from api and store in state object then calls calculate to update api
 * @param {current currency state} currency
 */
async function getExchangeRate(currency) {
  await fetch(`https://api.exchangerate-api.com/v4/latest/${state.currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      state.rates = data.rates;
      calculate();
    });
}

// Event listeners
currencyEl_one.addEventListener("change", getExchangeRate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", getExchangeRate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  state.currencyOne = state.currencyTwo;
  currencyEl_two.value = temp;
  state.currencyTwo = temp;
  getExchangeRate(state.currencyOne);
});
/**
 * added load event to fill global state object
 */
window.addEventListener("load", () => {
  state.currencyOne = currencyEl_one.value;
  state.currencyTwo = currencyEl_two.value;
  state.amountOne = amountEl_one.value;
  getExchangeRate(state.currencyOne);
});
