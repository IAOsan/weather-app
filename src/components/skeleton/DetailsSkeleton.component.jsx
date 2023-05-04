import DetailSkeleton from './DetailSkeleton.component';

function DetailsSkeleton() {
	return (
		<div>
			<p className='sr-only'>Loading, please wait</p>
			<div className='details flex'>
				<DetailSkeleton />
				<DetailSkeleton />
				<DetailSkeleton />
				<DetailSkeleton />
				<DetailSkeleton />
			</div>
		</div>
	);
}

export default DetailsSkeleton;
