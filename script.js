const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const power = (a, b) => a**b;

const operate = (num1, operator, num2) => {
	return operator === "+" ? add(num1, num2) :
					 operator === "-" ? subtract(num1, num2) :
					  operator === "*" ? multiply(num1, num2) : 
							operator === "/" ? divide(num1, num2) :
						 		operator === "^" ? power(num1, num2) :
								  "lmao";
}