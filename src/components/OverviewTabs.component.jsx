import { useState } from 'react';
import Tabs from './common/Tabs.component';
import TabContent from './common/TabContent.component';
import Overview from './Overview.component';
import OverviewTabsSkeleton from './skeleton/OverviewTabsSkeleton.component';
import { useAppContext } from '../context/App.context';
import { getImageUrl } from '../utils';

function OverviewTabs() {
	const {
		state: {
			unitSystem,
			isLoading,
			entities: {
				weather: {
					hourly: { splitted: hourlyWeather },
					daily: dailyWeather,
				},
			},
		},
	} = useAppContext();
	const [activeTab, setActiveTab] = useState('Hourly');

	function handleChangeTab({ target }) {
		const { id } = target.dataset;
		if (!id) return;
		setActiveTab(id);
	}

	function getIconUrl(name) {
		return getImageUrl(`${name}.svg`);
	}

	return (
		<Tabs
			tabsList={['Hourly', 'Daily']}
			activeTab={activeTab}
			onSelect={handleChangeTab}
			customClass='tabs tabs--overview mb-60'
		>
			{isLoading ? (
				<OverviewTabsSkeleton />
			) : (
				<>
					<TabContent id='Hourly' activeTab={activeTab}>
						<div className='flex'>
							{hourlyWeather.map((v) => (
								<Overview
									key={v.time}
									time={v.time}
									temp={v.temperature[unitSystem]}
									icon={getIconUrl(v.icon)}
									condition={v.condition}
								/>
							))}
						</div>
					</TabContent>
					<TabContent id='Daily' activeTab={activeTab}>
						<div className='flex'>
							{dailyWeather.map((v) => (
								<Overview
									key={v.day}
									time={v.day}
									temp={{
										min: v.tempMax[unitSystem],
										max: v.tempMin[unitSystem],
									}}
									icon={getIconUrl(v.icon)}
									condition={v.condition}
								/>
							))}
						</div>
					</TabContent>
				</>
			)}
		</Tabs>
	);
}

export default OverviewTabs;
