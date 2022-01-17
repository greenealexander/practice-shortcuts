import { useEffect, useState } from 'react';
import AddKeyCombo from './AddKeyCombo';
import Search from './Search';

const options = {
	Search,
	'Add Key Combo': AddKeyCombo,
};

const Legend = ({ shortcuts, onShowLegend, onAdd }) => {
	const [showLegend, setShowLegend] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Add Key Combo');
	const SelectedComponent = options[selectedOption];

	useEffect(() => {
		onShowLegend(showLegend);
	}, [showLegend, onShowLegend]);

	return (
		<>
			<button
				style={{ marginLeft: '16px' }}
				onClick={() => setShowLegend(!showLegend)}
			>
				Legend
			</button>

			{showLegend && (
				<div
					style={{
						position: 'absolute',
						inset: '0 0 0 0',
						padding: '8px 16px',
						backgroundColor: '#333',
						color: '#efefef',
						display: showLegend ? 'flex' : 'none',
						flexDirection: 'column',
						overflow: 'hidden',
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: '16px',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<h2>Legend</h2>

								<select
									style={{ marginLeft: '16px' }}
									value={selectedOption}
									onChange={(e) => setSelectedOption(e.target.value)}
								>
									{Object.keys(options).map((key) => (
										<option key={key} value={key}>
											{key}
										</option>
									))}
								</select>
							</div>

							<div>
								<button
									style={{ marginLeft: '16px' }}
									onClick={() => setShowLegend(!showLegend)}
								>
									Close
								</button>
							</div>
						</div>
					</div>

					<SelectedComponent shortcuts={shortcuts} onAdd={onAdd} />
				</div>
			)}
		</>
	);
};

export default Legend;
