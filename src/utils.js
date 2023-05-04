function isString(value) {
	return Object.prototype.toString.call(value) === '[object String]';
}

function isNumber(value) {
	return !isNaN(value);
}

function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

class NumberParser {
	constructor(value) {
		this.value = this._parse(value);
	}

	_parse(value) {
		if (isString(value)) {
			const normalizedValue = value.replace(/\s+/g, '');
			const isFloat = /^[0-9]+\.[0-9]+$/g.test(normalizedValue);
			return isFloat
				? parseFloat(normalizedValue)
				: parseInt(normalizedValue);
		}
		return +value;
	}

	precision(digits) {
		const pow = Math.pow(10, digits);
		return +(Math.round(this.value * pow) / pow).toFixed(digits);
	}
}

export const number = (value) => new NumberParser(value);

export function getClassName(...str) {
	return str
		.reduce((acc, s) => {
			if (!s) return acc;

			const isAnString = isString(s);
			const isANumber = isNumber(s);
			const isAnObject = isObject(s) && !!Object.keys(s).length;

			if (isAnString || isANumber) {
				acc.push(s);
			}

			if (isAnObject) {
				const [key, value] = Object.entries(s)[0];
				acc = acc.concat(value ? key : []);
			}

			return acc;
		}, [])
		.join(' ');
}
