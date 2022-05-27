const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const power = (a, b) => a ** b;

const operate = (num1, operator, num2) => {
  if (operator === "/" && num2 === 0) {
    return "lmao";
  } else {
    return operator === "+"
      ? add(num1, num2)
      : operator === "-"
      ? subtract(num1, num2)
      : operator === "*"
      ? multiply(num1, num2)
      : operator === "^"
      ? power(num1, num2)
      : operator === "/"
      ? divide(num1, num2)
      : alert("What are you doing?");
  }
};

const displayDiv = document.getElementById("display");

const numBtns = document.querySelectorAll(".num-btn");
numBtns.forEach(btn => {
  btn.addEventListener("click", event => {
    displayDiv.textContent += event.target.textContent;
  });
});

const deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", () => {
  displayDiv.textContent = displayDiv.textContent.slice(0, -1);
});

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  displayDiv.textContent = "";
});

const negativeBtn = document.getElementById("neg");
negativeBtn.addEventListener("click", () => {
  if (!displayDiv.textContent.includes("-")) {
    displayDiv.textContent = displayDiv.textContent.replace(/^/, "-");
  } else {
    displayDiv.textContent = displayDiv.textContent.substring(1);
  }
});

const decimalBtn = document.getElementById("decimal");
decimalBtn.addEventListener("click", () => {
  if (!displayDiv.textContent.includes(".")) {
    displayDiv.textContent = displayDiv.textContent.concat(".");
  }
});
