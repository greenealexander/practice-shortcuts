import { useEffect, useState } from 'react';
import { recordKeyCombination } from 'react-hotkeys';
import { createPortal } from 'react-dom';

const RecordKeyCombo = ({ onDone }) => {
	const [keyCombo, setKeyCombo] = useState([]);

	const handleKeyCombo = ({ id }) => {
		setKeyCombo((combo) => [...combo, id.replace(/control/i, 'ctrl')]);
	};

	useEffect(() => {
		return recordKeyCombination(handleKeyCombo);
	}, [keyCombo]);

	return createPortal(
		<div
			style={{
				position: 'absolute',
				inset: '0 0 0 0',
				backgroundColor: 'rgba(0,0,0,0.9)',
				display: 'flex',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
					margin: '32px auto',
				}}
			>
				<p
					style={{
						backgroundColor: '#2a2a2a',
						color: '#efefef',
						padding: '8px 16px',
						borderRadius: '8px',
						overflow: 'auto',
						height: '100px',
						width: '500px',
						boxSizing: 'border-box',
					}}
				>
					{keyCombo.join(' → ')}
				</p>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							backgroundColor: 'transparent',
							color: '#efefef',
							fontSize: '18px',
							padding: '0',
						}}
						disabled={keyCombo.length === 0}
						onClick={() => setKeyCombo([])}
					>
						Clear Key Combo
					</button>
					<button onClick={() => onDone(keyCombo)}>Done</button>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root'),
	);
};

export default RecordKeyCombo;
