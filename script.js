import { power, divide, multiply, minus, sum, square } from "./mathFunctions.js";

const equationForm = document.querySelector("#equation-form");
const inputField = document.querySelector("#equation");
const resultSection = document.querySelector("#results");

// regex section
const parRegex = /\((?<equation>[^\(\)]*)\)/;
const multipleDivideRegex = /(?<n1>\S+)\s*(?<step>[\/\*])\s*(?<n2>\S+)/;
const expRegex = /(?<n1>\S+)\s*(?<step>\^)\s*(?<n2>\S+)/;
const plusMinusRegex = /(?<n1>\S+)\s*(?<step>(?<!e)[\-\+])\s*(?<n2>\S+)/;

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

function doMath({ n1, n2, step }) {
	const x = parseFloat(n1);
	const y = parseFloat(n2);

	switch (step) {
		case "*":
			return multiply(x, y);
		case "/":
			return divide(x, y);
		case "+":
			return sum(x, y);
		case "-":
			return minus(x, y);
		case "^":
			return power(x, y);
	}
}
