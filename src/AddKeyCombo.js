import { useState } from 'react';
import RecordKeyCombo from './RecordKeyCombo';

const AddKeyCombo = ({ onAdd }) => {
	const [keyCombo, setKeyCombo] = useState([]);
	const [comboName, setComboName] = useState('');
	const [isRecordingCombo, setIsRecordingCombo] = useState(false);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: '36px auto',
				width: '500px',
				alignItems: 'flex-end',
				gap: '24px',
			}}
		>
			<input
				type="text"
				value={comboName}
				onChange={(e) => setComboName(e.target.value)}
				style={{ width: '100%' }}
			/>

			{isRecordingCombo && (
				<RecordKeyCombo
					onDone={(combo) => {
						setIsRecordingCombo(false);

						if (combo.length === 0) return;

						setKeyCombo(combo);
					}}
				/>
			)}

			<button onClick={() => setIsRecordingCombo(true)}>Record</button>

			{keyCombo.length > 0 && (
				<p
					style={{
						backgroundColor: '#2a2a2a',
						padding: '8px 16px',
						borderRadius: '8px',
						listStyle: 'none',
						overflow: 'auto',
						width: '100%',
						boxSizing: 'border-box',
						minHeight: '100px',
					}}
				>
					{keyCombo.join(' → ')}
				</p>
			)}

			<button
				disabled={keyCombo.length === 0 || comboName === ''}
				style={{ marginLeft: '32px' }}
				onClick={() => {
					onAdd({ name: comboName, sequence: keyCombo.join(' ') });
					setComboName('');
					setKeyCombo([]);
				}}
			>
				Add
			</button>
		</div>
	);
};

export default AddKeyCombo;
