import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
} from 'react';
import PropTypes from 'prop-types';
import appReducer, { actionTypes, initialState } from '../reducers/app.reducer';
import locationService from '../services/location.service';
import weatherService from '../services/weather.service';

export const AppContext = createContext();
export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context)
		throw new Error('useAppContext must be called in `AppContextProvider`');

	return context;
};

function AppContextProvider({ children }) {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const memoized = useRef({
		DEFAULT_LOCATION: 'London',
		getLocation,
		getWeather,
	});

	useEffect(() => {
		if (!Object.keys(state.entities.location).length) return;

		(async () => {
			const { lat, lng } = state.entities.location;
			await getWeather(lat, lng);
		})();
	}, [state.entities.location]);

	useEffect(() => {
		history.pushState(
			{},
			'',
			`${window.location.origin}/location?query=${state.query}`
		);
	}, [state.query]);

	async function getLocation(query) {
		dispatch({ type: actionTypes.START_LOADING });
		try {
			const response = await locationService.getByNameOrCoords(query);
			dispatch({ type: actionTypes.SET_QUERY, payload: query });
			dispatch({ type: actionTypes.SET_LOCATION, payload: response });
		} catch (error) {
			dispatch({ type: actionTypes.FINISH_LOADING });
			throw error;
		}
	}

	async function getWeather(lat, lng) {
		try {
			const response = await weatherService.getByCoords(lat, lng);
			dispatch({ type: actionTypes.SET_WEATHER, payload: response });
		} finally {
			dispatch({ type: actionTypes.FINISH_LOADING });
		}
	}

	function changeUnitSystem(shouldBeChanged) {
		dispatch({
			type: actionTypes.CHANGE_UNIT_SYSTEM,
			payload: shouldBeChanged,
		});
	}

	return (
		<AppContext.Provider
			value={{
				state,
				...memoized.current,
				changeUnitSystem,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppContextProvider;
