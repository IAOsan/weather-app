function isString(value) {
	return Object.prototype.toString.call(value) === '[object String]';
}

export function isNumber(value) {
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

class StringParser {
	constructor(value) {
		this.value = this.parse(value);
	}

	parse(value) {
		if (!value) return '';
		return String(value);
	}

	trim() {
		return this.value.trim();
	}
}

class DateParser {
	constructor(value) {
		this.value = new Date(value);
	}

	convertTimezone(timeZone, locale = 'en-US') {
		return new Date(this.value.toLocaleString(locale, { timeZone }));
	}
}

class UnitConversor {
	constructor(value, inputUnit) {
		this._value = value;
		this._inputUnit = inputUnit;
		this._outputUnit = null;
		this._units = {
			'°c': {
				'°c': (value) => value,
				'°f': (value) => value * 1.8 + 32,
			},
			'°f': {
				'°f': (value) => value,
				'°c': (value) => (value - 32) / 1.8,
			},
			'hpa': {
				hpa: (value) => value,
				psi: (value) => value * 0.014503773,
			},
			'psi': {
				psi: (value) => value,
				hpa: (value) => value * 68.948,
			},
			'km/h': {
				'km/h': (value) => value,
				'mph': (value) => value / 1.60934,
			},
			'mph': {
				'mph': (value) => value,
				'km/h': (value) => value * 1.60934,
			},
			'm': {
				km: (value) => value / 1000,
			},
			'mm': {
				mm: (value) => value,
				inch: (value) => value / 25.4,
			},
			'cm': {
				cm: (value) => value,
				inch: (value) => value / 2.54,
			},
			'inch': {
				inch: (value) => value,
				mm: (value) => value * 25.4,
				cm: (value) => value * 2.54,
			},
		};
	}

	get value() {
		const parsedVal = number(this._value).value;
		if (!isNumber(parsedVal))
			throw new Error(
				'The value to be converted is expected to be a number'
			);
		return parsedVal;
	}

	get inputUnit() {
		if (!isString(this._inputUnit))
			throw new Error('Input unit is expected to be a string');
		return string(this._inputUnit).trim().toLowerCase();
	}

	get outputUnit() {
		if (!isString(this._inputUnit))
			throw new Error('Output unit is expected to be a string');
		return string(this._outputUnit).trim().toLowerCase();
	}

	to(outputUnit) {
		this._outputUnit = outputUnit;

		const conversions = this._units[this.inputUnit];
		if (!conversions)
			throw new Error(
				`The conversion for "${this._inputUnit}" is not available`
			);

		const conversion = conversions[this.outputUnit];
		if (!conversion)
			throw new Error(
				`The conversion from ${this._inputUnit} to ${this._outputUnit} is not available`
			);

		return conversion(this.value);
	}
}

export class Validator {
	constructor(value) {
		this.value = value;
		this._label = '';
		this.error = null;
	}
	label(name) {
		if (!isString(name)) throw new Error('Label expected to be a string');
		this._label = name;
		return this;
	}
	string() {
		if (!isString(this.value) && !this.error) {
			this.error = `"${this._label}" must be a string`;
		}
		return this;
	}
	trim() {
		if (!isString(this.value))
			throw new Error('The value to trim is not of type string');
		this.value = this.value.trim();
		return this;
	}
	required(message) {
		if (!this.value !== 0 && !this.value && !this.error) {
			this.error =
				message || `"${this._label}" is not allowed to be empty`;
		}
		return this;
	}
}

export const number = (value) => new NumberParser(value);
export const string = (value) => new StringParser(value);
export const date = (value) => new DateParser(value);
export const convertUnit = (value, inputUnit) =>
	new UnitConversor(value, inputUnit);

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

export function getImageUrl(name) {
	return new URL(`./assets/${name}`, import.meta.url).href;
}
