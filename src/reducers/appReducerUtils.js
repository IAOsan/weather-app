import { number, isNumber, date } from '../utils';

export const DAY_SIZE = 24;

function getDay(dayOfTheWeek) {
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	if (dayOfTheWeek < 0 || dayOfTheWeek > 6) {
		throw new Error('Invalid day of the week');
	}

	return days[dayOfTheWeek];
}

function getCardinalDirection(degrees) {
	degrees = number(degrees).value;

	if (!isNumber(degrees)) {
		throw new Error('Degrees are expected to be a number');
	}

	return (degrees >= 337 && degrees <= 360) || (degrees >= 0 && degrees <= 23)
		? 'N'
		: degrees >= 24 && degrees <= 68
		? 'NE'
		: degrees >= 69 && degrees <= 113
		? 'E'
		: degrees >= 114 && degrees <= 158
		? 'SE'
		: degrees >= 159 && degrees <= 203
		? 'S'
		: degrees >= 204 && degrees <= 248
		? 'SW'
		: degrees >= 249 && degrees <= 293
		? 'W'
		: 'NW';
}

function getArraySum(arr, startIdx, endIdx) {
	if (!Array.isArray(arr))
		throw new Error('The first argument is expected to be an array');
	if (!isNumber(startIdx))
		throw new Error('The second argument is expected to be a number');
	if (!isNumber(endIdx))
		throw new Error('The third argument is expected to be a number');
	if (startIdx < 0)
		throw new Error(
			'The second argument must be greater than or equal to 0'
		);
	if (startIdx > arr.length)
		throw new Error(
			'The second argument must be less than or equal to the array length'
		);
	if (endIdx < 0)
		throw new Error(
			'The third argument must be greater than or equal to 0'
		);
	if (endIdx > arr.length)
		throw new Error(
			'The third argument must be less than or equal to the array length'
		);

	const slicedArr = arr.slice(startIdx, endIdx);
	const sum = slicedArr.reduce((acc, val) => acc + number(val).value);
	return sum;
}

export function formatCurrentWeather(data) {
	const { units, current, hourly, daily } = data;
	const hourlyTimeId = hourly.time.indexOf(current.time);
	const dailyTimeId = daily.time.indexOf(current.time.split('T')[0]);

	return {
		temperature: current.temperature,
		windSpeed: current.windSpeed,
		windSpeedFormatted: {
			metric: [current.windSpeed.metric, units.metric.windSpeed].join(
				' '
			),
			imperial: [
				current.windSpeed.imperial,
				units.imperial.windSpeed,
			].join(' '),
		},
		windDirection: current.windDirection,
		windDirectionFormatted: getCardinalDirection(current.windDirection),
		time: current.time,
		condition: current.condition.description,
		icon: current.condition.icon,
		apparentTemperature: {
			metric: hourly.apparentTemperature.metric[hourlyTimeId],
			imperial: hourly.apparentTemperature.imperial[hourlyTimeId],
		},
		precipitationProbability: `${daily.precipitationProbability[dailyTimeId]}${units.metric.precipitationProbability}`,
		precipitation: {
			metric: [
				number(
					getArraySum(hourly.precipitation.metric, 0, DAY_SIZE)
				).precision(2),
				units.metric.precipitation,
			].join(' '),
			imperial: [
				number(
					getArraySum(hourly.precipitation.imperial, 0, DAY_SIZE)
				).precision(2),
				units.imperial.precipitation,
			].join(' '),
		},
		rain: {
			metric: [
				number(getArraySum(hourly.rain.metric, 0, DAY_SIZE)).precision(
					2
				),
				units.metric.rain,
			].join(' '),
			imperial: [
				number(
					getArraySum(hourly.rain.imperial, 0, DAY_SIZE)
				).precision(2),
				units.imperial.rain,
			].join(' '),
		},
		snowfall: {
			metric: [
				number(
					getArraySum(hourly.snowfall.metric, 0, DAY_SIZE)
				).precision(2),
				units.metric.snowfall,
			].join(' '),
			imperial: [
				number(
					getArraySum(hourly.snowfall.imperial, 0, DAY_SIZE)
				).precision(2),
				units.imperial.snowfall,
			].join(' '),
		},
		humidity: hourly.humidity[hourlyTimeId],
		humidityFormatted: [
			hourly.humidity[hourlyTimeId],
			units.metric.humidity,
		].join(''),
		humidityStatus: (() => {
			const value = number(hourly.humidity[hourlyTimeId]).value;
			return value <= 40
				? 'Too dry'
				: value >= 40 && value <= 60
				? 'Optimal'
				: 'Too humid';
		})(),
		visibility: hourly.visibility[hourlyTimeId],
		visibilityFormatted: [
			hourly.visibility[hourlyTimeId],
			units.metric.visibility,
		].join(' '),
		visibilityStatus: (() => {
			const value = number(hourly.visibility[hourlyTimeId]).value;
			return value <= 2
				? 'Foggy'
				: value >= 2 && value <= 10
				? 'Hazy'
				: 'Clear';
		})(),
		uvIndex: daily.uvIndex[dailyTimeId] || 1,
		uvIndexStatus: (() => {
			const value = number(daily.uvIndex[dailyTimeId]) || 1;
			return value <= 2
				? 'Low'
				: value >= 3 && value <= 5
				? 'Moderate'
				: value >= 6 && value <= 7
				? 'High'
				: 'Very High';
		})(),
		pressure: hourly.pressure[hourlyTimeId],
		pressureFormatted: [
			hourly.pressure[hourlyTimeId],
			units.metric.pressure,
		].join(' '),
	};
}

export function formatHourlyWeather(data) {
	const { hourly } = data;

	return {
		splitted: Array.from({ length: DAY_SIZE }, (_, idx) => ({
			time: date(hourly.time[idx]).value.toLocaleTimeString('en-US', {
				hour: 'numeric',
			}),
			temperature: {
				metric: hourly.temperature.metric[idx],
				imperial: hourly.temperature.imperial[idx],
			},
			apparentTemperature: {
				metric: hourly.apparentTemperature.metric[idx],
				imperial: hourly.apparentTemperature.imperial[idx],
			},
			condition: hourly.condition[idx].description,
			icon: hourly.condition[idx].icon,
		})),
		raw: {
			time: hourly.time.slice(0, DAY_SIZE),
			temperature: {
				metric: hourly.temperature.metric.slice(0, DAY_SIZE),
				imperial: hourly.temperature.imperial.slice(0, DAY_SIZE),
			},
			apparentTemperature: {
				metric: hourly.apparentTemperature.metric.slice(0, DAY_SIZE),
				imperial: hourly.apparentTemperature.imperial.slice(
					0,
					DAY_SIZE
				),
			},
			precipitationProbability: hourly.precipitationProbability.slice(
				0,
				DAY_SIZE
			),
			rain: {
				metric: hourly.rain.metric.slice(0, DAY_SIZE),
				imperial: hourly.rain.imperial.slice(0, DAY_SIZE),
			},
			windSpeed: {
				metric: hourly.windSpeed.metric.slice(0, DAY_SIZE),
				imperial: hourly.windSpeed.imperial.slice(0, DAY_SIZE),
			},
			windDirection: hourly.windDirection
				.slice(0, DAY_SIZE)
				.map((v) => getCardinalDirection(v)),
		},
	};
}

export function formatDailyWeather(data) {
	const { daily } = data;

	return daily.time.map((v, idx) => {
		const [yy, mm, dd] = v.split('-');
		const weekDay = date(
			`${yy}, ${number(mm).value - 1}, ${dd}`
		).value.getDay();

		return {
			day: getDay(weekDay),
			tempMax: {
				metric: daily.tempMax.metric[idx],
				imperial: daily.tempMax.imperial[idx],
			},
			tempMin: {
				metric: daily.tempMin.metric[idx],
				imperial: daily.tempMin.imperial[idx],
			},
			condition: daily.condition[idx].description,
			icon: daily.condition[idx].icon,
		};
	});
}
