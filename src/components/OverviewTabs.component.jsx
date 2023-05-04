import Tabs from './common/Tabs.component';
import TabContent from './common/TabContent.component';
import Overview from './Overview.component';
import OverviewTabsSkeleton from './skeleton/OverviewTabsSkeleton.component';

function OverviewTabs() {
	return (
		<Tabs
			tabsList={['Hourly', 'Daily']}
			activeTab='Hourly'
			onSelect={() => {}}
			customClass='tabs tabs--overview mb-60'
		>
			<TabContent id='Hourly' activeTab='Hourly'>
				<div className='flex'>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp='12.5'
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
				</div>
			</TabContent>
			<TabContent id='Daily' activeTab='Hourly'>
				<div className='flex'>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
					<Overview
						time='12 AM'
						temp={{ min: '12.5', max: '20.5' }}
						icon='https://cdn-icons-png.flaticon.com/512/1163/1163634.png'
						condition='cloudy'
					/>
				</div>
			</TabContent>
		</Tabs>
	);
}

export default OverviewTabs;
