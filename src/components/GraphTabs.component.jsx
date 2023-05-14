import { useState } from 'react';
import Tabs from './common/Tabs.component';
import TabContent from './common/TabContent.component';
import Chart from './common/Chart.component';
import GraphTabsSkeleton from './skeleton/GraphTabsSkeleton.component';
import { useAppContext } from '../context/App.context';

function GraphTabs() {
	const {
		state: {
			isLoading,
			unitSystem,
			entities: {
				weather: {
					hourly: { raw: hourlyWeather },
				},
				units,
			},
		},
	} = useAppContext();
	const [activeTab, setActiveTab] = useState('Temperature');
	const timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
	});

	function handleChangeTab(e) {
		const { id } = e.target.dataset;
		if (!id) return;
		setActiveTab(id);
	}

	return (
		<Tabs
			tabsList={['Temperature', 'Precipitation', 'Wind']}
			activeTab={activeTab}
			onSelect={handleChangeTab}
		>
			{isLoading ? (
				<GraphTabsSkeleton />
			) : (
				<>
					<TabContent id='Temperature' activeTab={activeTab}>
						<Chart
							type='line'
							labels={hourlyWeather.time.map((v) =>
								timeFormatter.format(new Date(v))
							)}
							series={[
								hourlyWeather.apparentTemperature[unitSystem],
								hourlyWeather.temperature[unitSystem],
							]}
							legends={[
								`Aparent temperature ( ${units[unitSystem].temperature} )`,
								`Air temperature ( ${units[unitSystem].temperature} )`,
							]}
							options={{
								height: 336,
								width: 1280,
								showArea: true,
								axisY: {
									offset: 52,
									labelOffset: {
										x: -16,
									},
									labelInterpolationFnc: function (value) {
										return value + '°';
									},
								},
								axisX: {
									showGrid: false,
								},
							}}
							event={{
								type: 'draw',
								callback: (data) => {
									if (data.type === 'point') {
										const colors = {
											0: 'red',
											1: 'orangered',
										};
										const valueTag = `<small style='--color: ${
											colors[data.seriesIndex]
										}' class='chart__label-point'>${
											data.value.y
										}</small>`;
										const valuePoint = data.element
											.parent()
											.foreignObject(valueTag, {
												width: 60,
												height: 40,
												x: data.x - 20,
												y: data.y - 20,
											});

										data.element.replace(valuePoint);
									}
								},
							}}
							responsiveOptions={[
								[
									'screen and (min-width: 1200px)',
									{
										width: 1440,
									},
								],
							]}
						/>
					</TabContent>
					<TabContent id='Precipitation' activeTab={activeTab}>
						<Chart
							type='bar'
							labels={hourlyWeather.time.map((v) =>
								timeFormatter.format(new Date(v))
							)}
							series={[hourlyWeather.precipitationProbability]}
							legends={[`Probability of precipitation ( % )`]}
							options={{
								height: 336,
								width: 1280,
								stackBars: true,
							}}
							responsiveOptions={[
								[
									'screen and (min-width: 1200px)',
									{
										width: 1440,
									},
								],
							]}
						/>
					</TabContent>
					<TabContent id='Wind' activeTab={activeTab}>
						<Chart
							type='line'
							labels={hourlyWeather.time.map((v) =>
								timeFormatter.format(new Date(v))
							)}
							series={[hourlyWeather.windSpeed[unitSystem]]}
							legends={[
								`Wind speed ( ${units[unitSystem].windSpeed} )`,
							]}
							options={{
								height: 336,
								width: 1280,
								axisY: {
									offset: 64,
									labelOffset: {
										x: -8,
									},
									labelInterpolationFnc: function (value) {
										return (
											value + units[unitSystem].windSpeed
										);
									},
								},
								axisX: {
									labelOffset: {
										y: 12,
									},
									showGrid: false,
								},
							}}
							responsiveOptions={[
								[
									'screen and (min-width: 1200px)',
									{
										width: 1440,
									},
								],
							]}
							event={{
								type: 'draw',
								callback: (data) => {
									if (data.type === 'point') {
										const directionTag = `<small style='--color: orangered' class='chart__label-point'>NE</small>`;
										const valueTag = `<small style='--color: red' class='chart__label-point'>${data.value.y}</small>`;
										const valuePoint = data.element
											.parent()
											.foreignObject(valueTag, {
												width: 64,
												height: 40,
												x: data.x,
												y: data.y - 12,
											});

										data.element
											.parent()
											.foreignObject(directionTag, {
												width: 60,
												height: 40,
												x: data.x,
												y: data.y - 36,
											});

										data.element.replace(valuePoint);
									}
								},
							}}
						/>
					</TabContent>
				</>
			)}
		</Tabs>
	);
}

export default GraphTabs;
