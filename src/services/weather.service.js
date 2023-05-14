import { toast } from 'react-toastify';
import { date, convertUnit, number } from '../utils';
import httpService from './http.service';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';
const weatherCodes = {
	0: {
		description: 'Clear sky',
		icon: {
			day: '0d',
			night: '0n',
		},
	},
	1: {
		description: 'Mainly clear',
		icon: {
			day: '1d',
			night: '1n',
		},
	},
	2: {
		description: 'Party cloudy',
		icon: {
			day: '1d',
			night: '1n',
		},
	},
	3: {
		description: 'Overcast',
		icon: {
			day: '3',
			night: '3',
		},
	},
	45: {
		description: 'Fog',
		icon: {
			day: '40',
			night: '40',
		},
	},
	48: {
		description: 'Depositing rime fog',
		icon: {
			day: '40',
			night: '40',
		},
	},
	51: {
		description: 'Drizzle,light intensity',
		icon: {
			day: '50',
			night: '50',
		},
	},
	53: {
		description: 'Drizzle, moderate intensity',
		icon: {
			day: '50',
			night: '50',
		},
	},
	55: {
		description: 'Drizzle, heavy intensity',
		icon: {
			day: '50',
			night: '50',
		},
	},
	56: {
		description: 'Freezing drizzle, light intensity',
		icon: {
			day: '51',
			night: '51',
		},
	},
	57: {
		description: 'Freezing drizzle, heavy intensity',
		icon: {
			day: '51',
			night: '51',
		},
	},
	61: {
		description: 'Rain, light intensity',
		icon: {
			day: '60',
			night: '60',
		},
	},
	63: {
		description: 'Rain, moderate intensity',
		icon: {
			day: '60',
			night: '60',
		},
	},
	65: {
		description: 'Rain, heavy intensity',
		icon: {
			day: '60',
			night: '60',
		},
	},
	66: {
		description: 'Freezing rain, light intensity',
		icon: {
			day: '61',
			night: '61',
		},
	},
	67: {
		description: 'Freezing rain, heavy intensity',
		icon: {
			day: '61',
			night: '61',
		},
	},
	71: {
		description: 'Snowfall, light intensity',
		icon: {
			day: '70',
			night: '70',
		},
	},
	73: {
		description: 'Snowfall, moderate intensity',
		icon: {
			day: '70',
			night: '70',
		},
	},
	75: {
		description: 'Snowfall, heavy intensity',
		icon: {
			day: '70',
			night: '70',
		},
	},
	77: {
		description: 'Snow grains',
		icon: {
			day: '71',
			night: '71',
		},
	},
	80: {
		description: 'Rain showers, slight',
		icon: {
			day: '80d',
			night: '80n',
		},
	},
	81: {
		description: 'Rain showers, moderate',
		icon: {
			day: '80d',
			night: '80n',
		},
	},
	82: {
		description: 'Rain showers, violent',
		icon: {
			day: '80d',
			night: '80n',
		},
	},
	85: {
		description: 'Snow showers, sligth',
		icon: {
			day: '81d',
			night: '81n',
		},
	},
	86: {
		description: 'Snow showers, heavy',
		icon: {
			day: '81d',
			night: '81n',
		},
	},
	95: {
		description: 'Thunderstorm sligth or moderate',
		icon: {
			day: '90',
			night: '90',
		},
	},
	96: {
		description: 'Thunderstorm with slight hail',
		icon: {
			day: '91',
			night: '91',
		},
	},
	99: {
		description: 'Thunderstorm with heavy hail',
		icon: {
			day: '91',
			night: '91',
		},
	},
};

function getCondition(code, date) {
	const hours = new Date(date).getHours();
	const dayTime = hours >= 5 && hours <= 19 ? 'day' : 'night';
	const { description, icon } = weatherCodes[code];
	return {
		description,
		icon: icon[dayTime],
	};
}

async function getByCoords(lat, lng) {
	const params =
		'daily=temperature_2m_max,temperature_2m_min,precipitation_hours,precipitation_probability_max,weathercode,windspeed_10m_max,uv_index_max&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,surface_pressure,windspeed_10m,winddirection_10m,precipitation,snowfall,precipitation_probability,rain,weathercode,visibility&current_weather=true&timezone=auto';
	const url = `${baseUrl}?latitude=${lat}&longitude=${lng}&${params}`;

	try {
		const response = await httpService.get(url);

		const {
			current_weather,
			hourly_units,
			hourly,
			daily_units,
			daily,
			timezone,
		} = response;
		const localeDate = date(new Date()).convertTimezone(timezone);

		const units = {
			metric: {
				temperature: hourly_units.temperature_2m,
				humidity: hourly_units.relativehumidity_2m,
				pressure: hourly_units.surface_pressure,
				windSpeed: hourly_units.windspeed_10m,
				precipitation: hourly_units.precipitation,
				snowfall: hourly_units.snowfall,
				precipitationProbability:
					hourly_units.precipitation_probability,
				rain: hourly_units.rain,
				visibility: 'km',
				precipitationHours: daily_units.precipitation_hours,
			},
			imperial: {
				temperature: '°F',
				humidity: '%',
				pressure: 'hpa',
				windSpeed: 'mph',
				precipitation: 'inch',
				snowfall: 'inch',
				precipitationProbability: '%',
				rain: 'inch',
				visibility: 'km',
				precipitationHours: 'h',
			},
		};

		return {
			units,
			current: {
				temperature: {
					metric: number(current_weather.temperature).precision(2),
					imperial: number(
						convertUnit(
							current_weather.temperature,
							units.metric.temperature
						).to(units.imperial.temperature)
					).precision(2),
				},
				windSpeed: {
					metric: number(current_weather.windspeed).precision(2),
					imperial: number(
						convertUnit(
							current_weather.windspeed,
							units.metric.windSpeed
						).to(units.imperial.windSpeed)
					).precision(2),
				},
				windDirection: current_weather.winddirection,
				time: current_weather.time,
				condition: getCondition(
					current_weather.weathercode,
					localeDate
				),
			},
			hourly: {
				time: hourly.time,
				temperature: {
					metric: hourly.temperature_2m,
					imperial: hourly.temperature_2m.map((v) =>
						number(
							convertUnit(v, units.metric.temperature).to(
								units.imperial.temperature
							)
						).precision(2)
					),
				},
				humidity: hourly.relativehumidity_2m,
				apparentTemperature: {
					metric: hourly.apparent_temperature,
					imperial: hourly.apparent_temperature.map((v) =>
						number(
							convertUnit(v, units.metric.temperature).to(
								units.imperial.temperature
							)
						).precision(2)
					),
				},
				pressure: hourly.surface_pressure,
				windSpeed: {
					metric: hourly.windspeed_10m,
					imperial: hourly.windspeed_10m.map((v) =>
						number(
							convertUnit(v, units.metric.windSpeed).to(
								units.imperial.windSpeed
							)
						).precision(2)
					),
				},
				windDirection: hourly.winddirection_10m,
				precipitation: {
					metric: hourly.precipitation,
					imperial: hourly.precipitation.map((v) =>
						number(
							convertUnit(v, units.metric.precipitation).to(
								units.imperial.precipitation
							)
						).precision(2)
					),
				},
				snowfall: {
					metric: hourly.snowfall,
					imperial: hourly.snowfall.map((v) =>
						number(
							convertUnit(v, units.metric.snowfall).to(
								units.imperial.snowfall
							)
						).precision(2)
					),
				},
				precipitationProbability: hourly.precipitation_probability,
				rain: {
					metric: hourly.rain,
					imperial: hourly.rain.map((v) =>
						number(
							convertUnit(v, units.metric.rain).to(
								units.imperial.rain
							)
						).precision(2)
					),
				},
				condition: hourly.weathercode.map((c, idx) =>
					getCondition(c, hourly.time[idx])
				),
				visibility: hourly.visibility.map((v) =>
					convertUnit(v, 'm').to('km')
				),
			},
			daily: {
				time: daily.time,
				tempMax: {
					metric: daily.temperature_2m_max,
					imperial: daily.temperature_2m_max.map((v) =>
						number(
							convertUnit(v, units.metric.temperature).to(
								units.imperial.temperature
							)
						).precision(2)
					),
				},
				tempMin: {
					metric: daily.temperature_2m_min,
					imperial: daily.temperature_2m_min.map((v) =>
						number(
							convertUnit(v, units.metric.temperature).to(
								units.imperial.temperature
							)
						).precision(2)
					),
				},
				precipitationHours: daily.precipitation_hours,
				precipitationProbability: daily.precipitation_probability_max,
				condition: daily.weathercode.map((c) =>
					getCondition(c, localeDate)
				),
				windSpeed: {
					metric: daily.windspeed_10m_max,
					imperial: daily.windspeed_10m_max.map((v) =>
						number(
							convertUnit(v, units.metric.windSpeed).to(
								units.imperial.windSpeed
							)
						).precision(2)
					),
				},
				uvIndex: daily.uv_index_max,
			},
		};
	} catch (error) {
		toast.error(
			'Sorry, the weather could not be determined for the specified location, try again',
			{
				autoClose: false,
				position: 'top-center',
			}
		);
	}
}

export default {
	getByCoords,
};
