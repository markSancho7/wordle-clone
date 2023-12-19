const containerElement = document.getElementById('container');
const inputTextElement = document.getElementById('inputText');

const arrayWordsFiveLetters = ['bicho', 'calar', 'cajas', 'bueno'];
let newWord = '';
let newPlayerWord = [];

let newSecretWord = '';
let newSecretWordArray = [];

let counterRow = 0;
const counter = 5;

// imprimir tablero
const printBoard = () => {
	for (let i = 0; i < counter; i++) {
		const newRow = document.createElement('div');

		for (let j = 0; j < counter; j++) {
			const newCell = document.createElement('span');
			newCell.classList.add('cellSpace');
			newRow.append(newCell);
		}
		newRow.classList.add('rowSpace');
		containerElement.append(newRow);
	}
};
printBoard();

// generar palabra secreta
const randomWord = () => {
	const randomNumber = Math.floor(Math.random() * arrayWordsFiveLetters.length);
	newSecretWord = arrayWordsFiveLetters[randomNumber];
	const newWordSplit = arrayWordsFiveLetters[randomNumber].split('');
	newSecretWordArray = newWordSplit;
};
randomWord();

// guardar la palabra usuario
const saveNewWord = event => {
	if (event.key !== 'Enter') return;
	newWord = inputTextElement.value;
	filterWord(newWord);
};
// filtrar palabra usuario
const filterWord = newWord => {
	if (newWord.length !== 5) return;
	newPlayerWord = newWord.split('');
	checkWord();
};

// comprobar palabra
const checkWord = () => {
	console.log(newSecretWordArray);
	console.log(newPlayerWord);
	const allClases = [];

	for (let i = 0; i < newPlayerWord.length; i++) {
		const letter = newPlayerWord[i];
		console.log(letter);
		if (letter === newSecretWordArray[i]) {
			// newSecretWordArray[i] = '-';
			allClases[i] = 'green';
		} else if (newSecretWord.includes(letter)) {
			console.log(newSecretWordArray[i]);
			newSecretWordArray[i] = '-';
			// allClases[i] = 'orange';
		} else if (allClases[i] !== 'green') {
			allClases[i] = 'grey';
		}
	}
	console.log(allClases);
	printWord(allClases);
};

// pintar palabra usuario
const printWord = allClases => {
	for (let i = 0; i < newPlayerWord.length; i++) {
		containerElement.children[counterRow].children[i].classList.add(
			allClases[i]
		);
		containerElement.children[counterRow].children[i].textContent =
			newPlayerWord[i];
	}
	counterRow++;
};

inputTextElement.addEventListener('keypress', saveNewWord);
