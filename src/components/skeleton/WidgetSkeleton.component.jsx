function WidgetSkeleton() {
	return (
		<div className='row skeleton'>
			<p className='sr-only'>Loading, please wait</p>
			<div className='col-md-5 col-lg-12'>
				<div
					className='widget__icon skeleton__item mx-auto mb-4'
					aria-hidden={true}
				></div>
				<p
					style={{ '--itemWidth': '50%' }}
					className='widget__degress skeleton__item mx-auto mb-4'
					aria-hidden={true}
				></p>
				<p
					style={{ '--itemWidth': '75%' }}
					className='h5 mb-40 skeleton__item mx-auto'
					aria-hidden={true}
				></p>
			</div>
			<div className='col-md-7 col-lg-12 pos-rel'>
				<div className='widget__details'>
					<p
						className='h5 mb-4 skeleton__item'
						aria-hidden={true}
					></p>
					<p className='mb-40 skeleton__item' aria-hidden={true}></p>
					<div className='mb-4'>
						<p
							style={{ '--itemWidth': '30%' }}
							className='skeleton__item d-inline-block'
							aria-hidden={true}
						></p>
						<p
							style={{ '--itemWidth': '40%' }}
							className='skeleton__item d-inline-block float-right'
							aria-hidden={true}
						></p>
					</div>
					<div className='mb-4'>
						<p
							style={{ '--itemWidth': '30%' }}
							className='skeleton__item d-inline-block'
							aria-hidden={true}
						></p>
						<p
							style={{ '--itemWidth': '40%' }}
							className='skeleton__item d-inline-block float-right'
							aria-hidden={true}
						></p>
					</div>
					<div className='mb-4'>
						<p
							style={{ '--itemWidth': '30%' }}
							className='skeleton__item d-inline-block'
							aria-hidden={true}
						></p>
						<p
							style={{ '--itemWidth': '40%' }}
							className='skeleton__item d-inline-block float-right'
							aria-hidden={true}
						></p>
					</div>
					<div className='mb-4'>
						<p
							style={{ '--itemWidth': '30%' }}
							className='skeleton__item d-inline-block'
							aria-hidden={true}
						></p>
						<p
							style={{ '--itemWidth': '40%' }}
							className='skeleton__item d-inline-block float-right'
							aria-hidden={true}
						></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WidgetSkeleton;
