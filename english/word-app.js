const wordDataElement = document.getElementById('wordData');
const wordDataString = wordDataElement.dataset.words;

const wordList = wordDataString
	.split('\n')
	.map(line => {
		const parts = line.split(',');
		if (parts.length >= 2) {
			return {
				word: parts[0].trim(),
				meaning: parts[1].trim()
			};
		}
		return null;
	})
	.filter(item => item !== null && item.word && item.meaning);

// 状態管理
const state = {
	shuffledList: [],
	currentIndex: 0,
	isAnswered: false,
	isQuizRunning: false,
	mode: 'en-to-ja' // 'en-to-ja' or 'ja-to-en'
};

// DOM要素の取得
const wordDiv = document.getElementById('word');
const meaningDiv = document.getElementById('meaning');
const startBtn = document.getElementById('startBtn');
const answerBtn = document.getElementById('answerBtn');
const restartBtn = document.getElementById('restartBtn');
const toggleModeBtn = document.getElementById('toggleModeBtn');
const modeDisplay = document.getElementById('modeDisplay');

// 初期化関数
function initializeQuiz() {
	answerBtn.style.display = 'none';
	restartBtn.style.display = 'none';
	wordDiv.textContent = '単語集';
	meaningDiv.textContent = 'スタートを押して開始';
	updateModeDisplay();
}

// モード表示の更新
function updateModeDisplay() {
	if (state.mode === 'en-to-ja') {
		modeDisplay.textContent = 'モード: 英→日';
		toggleModeBtn.textContent = '日→英に切り替え';
	} else {
		modeDisplay.textContent = 'モード: 日→英';
		toggleModeBtn.textContent = '英→日に切り替え';
	}
}

// モード切り替え
function toggleMode() {
	state.mode = state.mode === 'en-to-ja' ? 'ja-to-en' : 'en-to-ja';
	updateModeDisplay();

	// クイズ実行中なら現在の問題をモードに合わせて再表示
	if (state.isQuizRunning && state.currentIndex < state.shuffledList.length) {
		showCurrentWord();
	}
}

// 現在の単語を表示（モードに応じて）
function showCurrentWord() {
	if (state.currentIndex < state.shuffledList.length) {
		const current = state.shuffledList[state.currentIndex];
		if (state.mode === 'en-to-ja') {
			wordDiv.textContent = current.word;
			meaningDiv.textContent = '';
		} else {
			wordDiv.textContent = current.meaning;
			meaningDiv.textContent = '';
		}
		state.isAnswered = false;
	}
}

// Fisher-Yatesシャッフルアルゴリズム
function shuffle(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// 次の単語を表示
function showNextWord() {
	if (state.currentIndex < state.shuffledList.length) {
		showCurrentWord();
	} else {
		endQuiz();
	}
}

// クイズ終了処理
function endQuiz() {
	wordDiv.textContent = '終了！';
	meaningDiv.textContent = `全${state.shuffledList.length}問`;
	answerBtn.style.display = 'none';
	restartBtn.style.display = 'inline-block';
	state.isQuizRunning = false;
}

// クイズ開始
function startQuiz() {
	if (wordList.length === 0) {
		wordDiv.textContent = '単語リストが空です';
		meaningDiv.textContent = '';
		return;
	}

	state.shuffledList = shuffle([...wordList]);
	state.currentIndex = 0;
	state.isAnswered = false;
	state.isQuizRunning = true;

	startBtn.style.display = 'none';
	answerBtn.style.display = 'inline-block';
	restartBtn.style.display = 'none';

	showNextWord();
}

// 答えを表示
function showAnswer() {
	if (!state.isQuizRunning || state.isAnswered) return;

	const current = state.shuffledList[state.currentIndex];

	// モードに応じて答えを表示
	if (state.mode === 'en-to-ja') {
		meaningDiv.textContent = current.meaning;
	} else {
		meaningDiv.textContent = current.word;
	}

	state.isAnswered = true;
	state.currentIndex++;

	setTimeout(showNextWord, 1500);
}

// イベントリスナーの設定
function setupEventListeners() {
	startBtn.addEventListener('click', startQuiz);
	answerBtn.addEventListener('click', showAnswer);
	restartBtn.addEventListener('click', startQuiz);
	toggleModeBtn.addEventListener('click', toggleMode);
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function () {
	initializeQuiz();
	setupEventListeners();
});