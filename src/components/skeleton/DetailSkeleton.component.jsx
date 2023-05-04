function DetailSkeleton() {
	return (
		<article className='detail-card surface skeleton'>
			<h4
				style={{ '--itemWidth': '25%' }}
				className='font-f-heading mb-12 skeleton__item'
				aria-hidden={true}
			></h4>
			<p
				style={{ '--itemWidth': '80%' }}
				className='h2 font-f-heading mb-12 skeleton__item'
				aria-hidden={true}
			></p>
			<p
				style={{ '--itemWidth': '40%' }}
				className='mb-12 skeleton__item'
				aria-hidden={true}
			></p>
			<p className='skeleton__item' aria-hidden={true}></p>
		</article>
	);
}

export default DetailSkeleton;
