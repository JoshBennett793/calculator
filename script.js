const displayDiv = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator");
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");
const negativeBtn = document.getElementById("neg");
const decimalBtn = document.getElementById("decimal");
const operateBtn = document.getElementById("operate");

let shouldClearDisplay = false;
let option = false;
let maxed = "";

let operation = {
  evaluate(num1, operator, num2) {
    operation.num_2 = Number(displayDiv.textContent);
    console.log(operation.num_2);
    operation.value = operate(operation);
    displayValue();
  },
};

deleteBtn.addEventListener("click", deleteNumber);
clearBtn.addEventListener("click", clearAll);
negativeBtn.addEventListener("click", NegativeSwitch);
decimalBtn.addEventListener("click", addDecimal);

numBtns.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => addOperator(btn));
});

operateBtn.addEventListener("click", () => {
  operation.evaluate(this.num_1, this.operator, this.num_2);
  option = false;
});

function appendNumber(number) {
  let displayContent = displayDiv.innerText;

  /**
   * Allows user to string together multiple operations even
   * if display was maxed out
   */
  if (displayContent.length <= 9 && shouldClearDisplay) {
    clearDisplay();
    shouldClearDisplay = false;
    displayDiv.textContent += number;

  // Limits user to 9 digits to prevent overflow
  } else if (displayContent.length === 9) {
    maxed = true;
    return;

  /**
   * Handles all other instances where operand is < 9
   */
  } else {
    if (shouldClearDisplay) {
      clearDisplay();
      shouldClearDisplay = false;
      displayDiv.textContent += number;
    } else {
      displayDiv.textContent += number;
    }
  }
}

const displayValue = () => (displayDiv.textContent = operation.value);

const clearDisplay = () => (displayDiv.textContent = "");

function deleteNumber() {
  displayDiv.textContent = displayDiv.textContent.slice(0, -1);
}

function clearAll() {

  // Wipe all operation key values
  operation.num_1 = "";
  operation.operator = "";
  operation.num_2 = "";

  // Clear display
  displayDiv.textContent = "";

  // Removes styling
  operatorBtns.forEach((btn) => btn.classList.remove("selectedOperator"));

  // Resets booleans
  shouldClearDisplay = false;
  option = false;
}

function NegativeSwitch() {
  if (!displayDiv.textContent.includes("-")) {
    displayDiv.textContent = displayDiv.textContent.replace(/^/, "-");
  } else {
    displayDiv.textContent = displayDiv.textContent.substring(1);
  }
}

function addDecimal() {
  if (!displayDiv.textContent.includes(".")) {
    displayDiv.textContent = displayDiv.textContent.concat(".");
  }
}

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const power = (a, b) => a ** b;

function operate(obj) {
  if (obj.operator === "/" && obj.num_2 === 0) {
    return (obj.value = "calculating...");
  } else {
    if (obj.operator === "+") {
      return (obj.value = Math.round(add(obj.num_1, obj.num_2) * 1000) / 1000);
    } else if (obj.operator === "-") {
      return (obj.value =
        Math.round(subtract(obj.num_1, obj.num_2) * 1000) / 1000);
    } else if (obj.operator === "x") {
      return (obj.value =
        Math.round(multiply(obj.num_1, obj.num_2) * 1000) / 1000);
    } else if (obj.operator === "^") {
      return (obj.value =
        Math.round(power(obj.num_1, obj.num_2) * 1000) / 1000);
    } else if (obj.operator === "/") {
      return (obj.value =
        Math.round(divide(obj.num_1, obj.num_2) * 1000) / 1000);
    } else {
      return (obj.value = "error");
    }
  }
}

function addOperator(btn) {
  if (option === false) {

    // Remove styling if any and apply styling to selected operator
    operatorBtns.forEach((btn) => btn.classList.remove("selectedOperator"));
    btn.classList.add("selectedOperator");

    // Assigns selected operator and current display content to first operand
    operation.operator = btn.textContent;
    operation.num_1 = Number(displayDiv.textContent);

    /** 
     * Sets boolean that clears display if user begins 
     * inputting digits after operator is selected
     */
    shouldClearDisplay = true;

    /**
     * Allows user to continue inputting second operand
     * if an operator is selected instead of "="
     */
    option = true;
    
    /**
     * Resets boolean which in turn allows user to add additional input
     * after operator has been selected even if display was maxed out
     */
    maxed = false;

  } else if (option === true) {

    // Evaluate operation and assign return value to first operand.
    operation.value = operation.evaluate();
    operation.num_1 = Number(displayDiv.textContent);
    
    operatorBtns.forEach((btn) => btn.classList.remove("selectedOperator"));
    btn.classList.add("selectedOperator");
    operation.operator = btn.textContent;

    shouldClearDisplay = true;
    maxed = false;
  }
}
