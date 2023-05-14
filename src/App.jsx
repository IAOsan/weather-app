import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header.component';
import Widget from './components/Widget.component';
import OverviewTabs from './components/OverviewTabs.component';
import Details from './components/Details.component';
import GraphTabs from './components/GraphTabs.component';
import { useAppContext } from './context/App.context';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
	const { getLocation, DEFAULT_LOCATION } = useAppContext();

	useEffect(() => {
		(async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const locationParam = urlParams.get('query');
			await getLocation(locationParam || DEFAULT_LOCATION);
		})();
	}, [getLocation, DEFAULT_LOCATION]);

	return (
		<main>
			<Header />
			<Widget />
			<OverviewTabs />
			<Details />
			<GraphTabs />
			<ToastContainer
				closeOnClick
				pauseOnFocusLoss
				pauseOnHover
				draggable
			/>
		</main>
	);
}

export default App;
