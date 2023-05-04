import OverviewSkeleton from './OverviewSkeleton.component';

function OverviewTabsSkeleton() {
	return (
		<div>
			<p className='sr-only'>Loading, please wait</p>
			<div className='flex'>
				{Array.from({ length: 7 }, (_, idx) => idx + 1).map((n) => (
					<OverviewSkeleton key={n} />
				))}
			</div>
		</div>
	);
}

export default OverviewTabsSkeleton;
