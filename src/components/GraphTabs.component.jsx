import Tabs from './common/Tabs.component';
import TabContent from './common/TabContent.component';
import Chart from './common/Chart.component';
import GraphTabsSkeleton from './skeleton/GraphTabsSkeleton.component';

function GraphTabs() {
	// 	const { weather, isLoading, unitSystem, units } = useAppContext();
	// 	const [activeTab, setActiveTab] = useState('temperature');
	// 	const timeFormatter = new Intl.DateTimeFormat('en-US', {
	// 		hour: 'numeric',
	// 	});

	// function handleChangeTab(e) {
	// 	const { id } = e.target.dataset;
	// 	if (!id) return;
	// 	setActiveTab(id);
	// }

	return (
		<Tabs
			tabsList={['Temperature', 'Precipitation', 'Wind']}
			activeTab='Temperature'
			onSelect={() => {}}
		>
			<TabContent id='Temperature' activeTab={'Temperature'}>
				<Chart
					type='line'
					labels={[
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
					]}
					series={[
						[12, 9, 7, 8, 5],
						[2, 1, 3.5, 7, 3],
						[1, 3, 4, 5, 6],
					]}
					legends={[
						`Aparent temperature ( °C )`,
						`Air temperature ( °C )`,
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
			<TabContent id='Precipitation' activeTab={'Temperature'}>
				<Chart
					type='bar'
					labels={[
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
					]}
					series={[
						[12, 9, 7, 8, 5],
						[2, 1, 3.5, 7, 3],
						[1, 3, 4, 5, 6],
					]}
					legends={[
						`Probability of precipitation ( % )`,
						`Total rain ( mm )`,
					]}
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
			<TabContent id='Wind' activeTab={'Temperature'}>
				<Chart
					type='line'
					labels={[
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
					]}
					series={[
						[12, 9, 7, 8, 5],
						[2, 1, 3.5, 7, 3],
						[1, 3, 4, 5, 6],
					]}
					legends={[`Wind speed ( km/h )`]}
					options={{
						height: 336,
						width: 1280,
						axisY: {
							offset: 64,
							labelOffset: {
								x: -8,
							},
							labelInterpolationFnc: function (value) {
								return value + 'km/h';
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
		</Tabs>
	);
}

export default GraphTabs;
