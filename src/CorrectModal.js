import { createPortal } from 'react-dom';

const CorrectModal = ({ correctCommandPressed, onNextPressed }) => {
	if (!correctCommandPressed) return null;

	return createPortal(
		<div
			style={{
				position: 'absolute',
				inset: '0 0 0 0',
				backgroundColor: 'rgba(0,0,0,0.3)',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<form
				style={{
					backgroundColor: '#efefef',
					color: '#333',
					padding: '36px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '36px',
					width: '500px',
					height: '150px',
					borderRadius: '16px',
				}}
				onSubmit={(e) => {
					e.preventDefault();
					onNextPressed?.();
				}}
			>
				<h3>✅ Correct!</h3>
				<p style={{ margin: '24px 0' }}>
					<i>
						{correctCommandPressed.sequence
							.split(' ')
							.join(' → ')
							.toUpperCase()}
					</i>
				</p>
				<button style={{ marginTop: '16px' }} type="submit" autoFocus>
					Next
				</button>
			</form>
		</div>,
		document.getElementById('modal-root'),
	);
};

export default CorrectModal;
