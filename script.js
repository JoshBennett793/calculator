const displayDiv = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator");
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");
const negativeBtn = document.getElementById("neg");
const decimalBtn = document.getElementById("decimal");
const operateBtn = document.getElementById("operate");

let shouldClearAll = false;
let shouldClearDisplay = false;
let option = false;

let operation = {
  evaluate(num1, operator, num2) {
    operation.num_2 = Number(displayDiv.textContent);
    console.log(operation.num_2);
    operation.value = operate(operation);
    displayValue();
  },
};

numBtns.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => addOperator(btn));
});

deleteBtn.addEventListener("click", deleteNumber);
clearBtn.addEventListener("click", clearAll);
negativeBtn.addEventListener("click", NegativeSwitch);
decimalBtn.addEventListener("click", addDecimal);

function appendNumber(number) {
  if (shouldClearDisplay) {
    clearDisplay();
    shouldClearDisplay = false;
    displayDiv.textContent += number;
  } else {
    displayDiv.textContent += number;
  }
}

function deleteNumber() {
  displayDiv.textContent = displayDiv.textContent.slice(0, -1);
}

function clearAll() {
  operation.num_1 = "";
  operation.operator = "";
  operation.num_2 = "";
  delete operation.value;
  displayDiv.textContent = "";
  operatorBtns.forEach((btn) => btn.classList.remove("selectedOperator"));
  shouldClearAll = false;
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
      alert("How did you do that?");
    }
  }
}

operateBtn.addEventListener("click", () => {
  operation.evaluate(this.num_1, this.operator, this.num_2)
  option = false;
});

const displayValue = () => (displayDiv.textContent = operation.value);

const clearDisplay = () => (displayDiv.textContent = "");

function addOperator(btn) {
  if (!btn.classList.contains("selectedOperator") && option === false) {
    operatorBtns.forEach((btn) => btn.classList.remove("selectedOperator"));
    btn.classList.add("selectedOperator");
    operation.operator = btn.textContent;
    operation.num_1 = Number(displayDiv.textContent);
    
    shouldClearDisplay = true;
    option = true;
  } else if (option = true) {
    operation.value = operation.evaluate();
    operation.num_1 = Number(displayDiv.textContent);
    delete operation.value;
    
    operatorBtns.forEach((btn) => btn.classList.remove("selectedOperator"));
    btn.classList.add("selectedOperator");
    operation.operator = btn.textContent;
   
    shouldClearDisplay = true;
  }
}
