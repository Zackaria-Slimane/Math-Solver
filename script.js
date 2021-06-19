import { power, divide, multiply, minus, sum, square } from "./mathFunctions.js";

const equationForm = document.querySelector("#equation-form");
const inputField = document.querySelector("#equation");
const resultSection = document.querySelector("#results");

// regex section
const parRegex = /\((?<equation>[^\(\)]*)\)/;
const multipleDivideRegex = /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/;
const expRegex = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/;
const plusMinusRegex = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/;

equationForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let result = parse(inputField.value);
	resultSection.textContent = result;
});

function parse(equation) {
	if (equation.match(parRegex)) {
		const subEquation = equation.match(parRegex).groups.equation;
		const result = parse(subEquation);
		const newEquation = equation.replace(parRegex, result);
		return parse(newEquation);
	} else if (equation.match(expRegex)) {
		const result = doMath(equation.match(expRegex).groups);
		const newEquation = equation.replace(expRegex, result);
		return parse(newEquation);
	} else if (equation.match(multipleDivideRegex)) {
		const result = doMath(equation.match(multipleDivideRegex).groups);
		const newEquation = equation.replace(multipleDivideRegex, result);
		return parse(newEquation);
	} else if (equation.match(plusMinusRegex)) {
		const result = doMath(equation.match(plusMinusRegex).groups);
		const newEquation = equation.replace(plusMinusRegex, result);
		return parse(newEquation);
	} else {
		return parseFloat(equation);
	}
}

// math operatoins

function doMath({ operand1, operand2, operation }) {
	const number1 = parseFloat(operand1);
	const number2 = parseFloat(operand2);

	switch (operation) {
		case "*":
			return number1 * number2;
		case "/":
			return number1 / number2;
		case "+":
			return number1 + number2;
		case "-":
			return number1 - number2;
		case "^":
			return number1 ** number2;
	}
}
