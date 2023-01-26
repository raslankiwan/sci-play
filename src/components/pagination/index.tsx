import './index.css';

export const Pagination = (props: any) => {
	const arr = Array.from({ length: props.size }, (_, i) => i + 1);
	return (
		<div className='pagination'>
			<a
				href='#'
				onClick={() =>
					props.selected - 1 > 0
						? props.handler(props.selected - 1)
						: null
				}
			>
				&laquo;
			</a>
			{arr.map((i: number) => (
				<a
					key={i}
					style={{ color: i === props.selected ? 'red' : 'black' }}
					onClick={() => props.handler(i)}
					href='#'
				>
					{i}
				</a>
			))}

			<a
				href='#'
				onClick={() =>
					props.selected + 1 <= props.size
						? props.handler(props.selected + 1)
						: null
				}
			>
				&raquo;
			</a>
		</div>
	);
};

