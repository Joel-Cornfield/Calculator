let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const secondaryDisplay = document.getElementById("secondary-display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const decimalButton = document.querySelector(".decimal");
const deleteButton = document.getElementById("delete");

function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = value;
    shouldResetDisplay = false;
  } else {
    display.textContent =
      display.textContent === "0" ? value : display.textContent + value;
  }
}

function resetCalculator() {
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
  display.textContent = "0";
  secondaryDisplay.textContent = "";
}

function handleOperator(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  firstNumber = parseFloat(display.textContent);
  currentOperator = operator;
  shouldResetDisplay = true;
  secondaryDisplay.textContent = `${firstNumber} ${operator}`;
}

function calculate() {
  if (currentOperator === null || firstNumber === null) return;
  secondNumber = parseFloat(display.textContent);

  let result;
  switch (currentOperator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
      break;
    default:
      return;
  }

  display.textContent = Math.round(result * 1000) / 1000; // Round to 3 decimals
  firstNumber = result;
  currentOperator = null;
  secondaryDisplay.textContent = ""; // Clear the operation display after calculation
}

digitButtons.forEach((button) =>
  button.addEventListener("click", () => updateDisplay(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => handleOperator(button.textContent))
);

equalsButton.addEventListener("click", calculate);

clearButton.addEventListener("click", resetCalculator);

decimalButton.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    updateDisplay(".");
  }
});

function deleteLastNumber() {
    if (shouldResetDisplay) return;
    display.textContent = 
        display.textContent.length > 1
        ? display.textContent.slice(0, -1)
        : "0";
}

deleteButton.addEventListener("click", deleteLastNumber);
