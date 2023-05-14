import {
	formatCurrentWeather,
	formatHourlyWeather,
	formatDailyWeather,
} from './appreducerUtils';

export const actionTypes = {
	START_LOADING: 'START_LOADING',
	FINISH_LOADING: 'FINISH_LOADING',
	SET_LOCATION: 'SET_LOCATION',
	SET_WEATHER: 'SET_WEATHER',
	CHANGE_UNIT_SYSTEM: 'CHANGE_UNIT_SYSTEM',
	SET_QUERY: 'SET_QUERY',
};
export const initialState = {
	isLoading: true,
	unitSystem: 'metric',
	query: '',
	entities: {
		location: {},
		weather: {
			current: {},
			hourly: {
				raw: {},
				splitted: [],
			},
			daily: [],
		},
		units: {},
	},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.START_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}
		case actionTypes.FINISH_LOADING: {
			return {
				...state,
				isLoading: false,
			};
		}
		case actionTypes.SET_LOCATION: {
			return {
				...state,
				entities: {
					...state.entities,
					location: action.payload,
				},
			};
		}
		case actionTypes.SET_WEATHER: {
			const { payload: data } = action;

			return {
				...state,
				entities: {
					...state.entities,
					weather: {
						current: formatCurrentWeather(data),
						hourly: formatHourlyWeather(data),
						daily: formatDailyWeather(data),
					},
					units: data.units,
				},
			};
		}
		case actionTypes.CHANGE_UNIT_SYSTEM: {
			return {
				...state,
				unitSystem: action.payload ? 'imperial' : 'metric',
			};
		}
		case actionTypes.SET_QUERY: {
			return {
				...state,
				query: action.payload,
			};
		}
		default:
			throw Error('unknown action');
	}
}
