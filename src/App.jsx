import { useEffect } from 'react';
import Header from './components/Header.component';
import Widget from './components/Widget.component';
import OverviewTabs from './components/OverviewTabs.component';
import Details from './components/Details.component';
import GraphTabs from './components/GraphTabs.component';

function App() {
	return (
		<main>
			<Header />
			<Widget />
			<OverviewTabs />
			<Details />
			<GraphTabs />
		</main>
	);
}

export default App;
