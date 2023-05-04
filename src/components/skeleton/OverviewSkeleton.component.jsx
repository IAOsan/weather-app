function OverviewSkeleton() {
	return (
		<article className='overview-card surface skeleton'>
			<h4
				style={{ '--itemWidth': '80%' }}
				className='mb-4 skeleton__item mx-auto'
				aria-hidden={true}
			></h4>
			<span className='icon icon--overview skeleton__item'></span>
			<p className='skeleton__item' aria-hidden={true}></p>
		</article>
	);
}

export default OverviewSkeleton;
