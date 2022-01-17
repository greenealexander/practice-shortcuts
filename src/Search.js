import { useEffect, useRef, useState } from 'react';

const Search = ({ shortcuts }) => {
	const [search, setSearch] = useState('');
	const [filteredResults, setFilteredResults] = useState(null);
	const timeoutRef = useRef(null);

	useEffect(() => {
		if (search === '') {
			setFilteredResults(null);
			clearTimeout(timeoutRef.current);
			return;
		}

		timeoutRef.current = setTimeout(() => {
			setFilteredResults(
				shortcuts.filter(({ name, sequence }) => {
					return (
						name.toLowerCase().includes(search) ||
						sequence.toLowerCase().includes(search)
					);
				}),
			);
		}, 500);
	}, [shortcuts, search]);

	return (
		<div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					overflow: 'hidden',
					padding: '8px 16px',
					borderBottom: '1px solid #efefef',
				}}
			>
				<p style={{ marginRight: '8px' }}>🔍</p>
				<input
					autoFocus
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
					placeholder="Search"
					style={{
						flex: '1',
						padding: '8px 0',
						backgroundColor: 'transparent',
						color: '#efefef',
						border: 'none',
					}}
				/>
			</div>

			<ul
				style={{
					flex: '1',
					overflow: 'auto',
				}}
			>
				{(filteredResults || shortcuts).map(({ name, sequence }) => (
					<li
						key={name}
						style={{
							borderTop: '1px solid #efefef66',
							display: 'flex',
							padding: '16px 0',
						}}
					>
						<p style={{ marginRight: '16px', fontWeight: 600 }}>{name}</p>
						<p>
							<i>{sequence.split(' ').join(' → ').toUpperCase()}</i>
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Search;
