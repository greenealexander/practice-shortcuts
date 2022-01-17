import { useEffect, useState } from 'react';
import { GlobalHotKeys, configure } from 'react-hotkeys';
import CorrectModal from './CorrectModal';

import { customKeyCodes } from './hotkeys';
import { readShortcuts, saveShortcuts } from './ShortcutStorage';
import Legend from './Legend';

const keyCombos = readShortcuts();
const keyMap = keyCombos.reduce((k, shortcut) => {
	k[shortcut.name] = shortcut;
	return k;
}, {});

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function App() {
	const [shortcuts, setShortcuts] = useState(keyCombos);
	const [keymap, setKeymap] = useState(keyMap);
	const [selectedCommand, setSelectedCommand] = useState(
		getRandomInt(shortcuts.length),
	);
	const [showAnswer, setShowAnswer] = useState(false);
	const [correctCommandPressed, setCorrectCommandPressed] = useState(null);
	const [pause, setPause] = useState(false);

	useEffect(() => {
		configure({ customKeyCodes });
	}, []);

	return (
		<>
			<GlobalHotKeys
				allowChanges={true}
				keyMap={keymap}
				handlers={
					shortcuts.length > 0
						? {
								[shortcuts[selectedCommand].name]: () =>
									!pause &&
									setCorrectCommandPressed(shortcuts[selectedCommand]),
						  }
						: {}
				}
			/>

			<div style={{ padding: '8px 16px' }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<h2>Practice</h2>
					<Legend
						shortcuts={shortcuts}
						onShowLegend={(showing) => setPause(showing)}
						onAdd={(shortcut) => {
							setShortcuts((shortcuts) => {
								const list = [...shortcuts, shortcut];
								saveShortcuts(list);
								return list;
							});
							setKeymap((keymap) => {
								keymap[shortcut.name] = shortcut;
								return keymap;
							});
						}}
					/>
				</div>
				<hr />

				{shortcuts.length > 0 && (
					<>
						<p style={{ paddingTop: '16px' }}>
							Press the key combination for:{' '}
						</p>
						<p
							style={{
								flex: '1',
								fontSize: '24px',
								fontWeight: 600,
								margin: '16px 0',
								padding: '36px 0',
							}}
						>
							{shortcuts[selectedCommand].name}
						</p>

						<button onClick={() => setShowAnswer(!showAnswer)}>
							{showAnswer ? 'Hide Answer' : 'Show Answer'}
						</button>

						<p style={{ opacity: showAnswer ? 1 : 0, margin: '16px 0' }}>
							<b>Answer: </b>
							{shortcuts[selectedCommand].sequence
								.split(' ')
								.join(' → ')
								.toUpperCase()}
						</p>
					</>
				)}
			</div>

			<CorrectModal
				correctCommandPressed={correctCommandPressed}
				onNextPressed={() => {
					let nextCommand = getRandomInt(shortcuts.length);

					if (shortcuts.length > 1) {
						while (nextCommand === selectedCommand) {
							nextCommand = getRandomInt(shortcuts.length);
						}
					}

					setSelectedCommand(nextCommand);
					setCorrectCommandPressed(null);
					setShowAnswer(false);
				}}
			/>
		</>
	);
}

export default App;
