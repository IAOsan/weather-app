function ChartSkeleton() {
	return (
		<article className='chart surface skeleton'>
			<div className='chart__body'>
				<div
					style={{ '--itemWidth': '100%', '--itemHeight': '30rem' }}
					className='skeleton__item'
				></div>
			</div>
			<div className='chart__footer'>
				<small
					style={{ '--itemWidth': '20rem' }}
					className='chart__legend skeleton__item mb-4'
					aria-hidden={true}
				></small>
				<small
					style={{ '--itemWidth': '20rem' }}
					className='chart__legend skeleton__item'
					aria-hidden={true}
				></small>
			</div>
		</article>
	);
}

export default ChartSkeleton;
