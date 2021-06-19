export function sum(...arg) {
	let result = 0;
	for (let i of arg) {
		result += i;
	}
	return result;
}
export function minus(...arg) {
	let result = 0;
	for (let i of arg) {
		result -= i;
	}
	return result;
}

export function multiply(...arg) {
	let result = 0;
	for (let i of arg) {
		result *= i;
	}
	return result;
}

export function divide(...arg) {
	let result = 0;
	for (let i in arg) {
		result /= i;
	}
	return result;
}

export function power(a, b) {
	let result = 0;
	result = Math.pow(a, b);
	return result;
}

export function square(a, b) {
	let result = 0;
	result = Math.sqrt(a, b);
	return result;
}
