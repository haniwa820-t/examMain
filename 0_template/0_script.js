// 初期化：全てを非表示（空白）に
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".toggle-text").forEach(el => {
		const original = el.dataset.originalText;
		for (let hitomoji of original) {
			if (hitomoji.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
				el.textContent += "　";
			} else {
				el.textContent += " ";
			}
		}
	});
});

// 個別トグル
function toggleText(el) {
	const original = el.dataset.originalText;
	if (el.textContent.trim() === "") {
		el.textContent = original;
	} else {
		el.textContent = "";
		for (let hitomoji of original) {
			if (hitomoji.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
				el.textContent += "　";
			} else {
				el.textContent += " ";
			}
		}
	}
}

// 全体の表示状態を保持
let allVisible = false;

// 一括表示/非表示トグル
function toggleAll() {
	const elements = document.querySelectorAll(".toggle-text");
	const buttons = document.querySelectorAll(".toggle-all-btn"); // 複数のボタンを取得

	elements.forEach(el => {
		const original = el.dataset.originalText;
		if (allVisible) {
			el.textContent = "";
			for (let hitomoji of original) {
				if (hitomoji.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
					el.textContent += "　";
				} else {
					el.textContent += " ";
				}
			}
		} else {
			el.textContent = original; // 表示に
		}
	});

	allVisible = !allVisible;

	// すべてのボタンのテキストを更新
	buttons.forEach(button => {
		button.textContent = allVisible ? "すべて非表示にする" : "すべて表示する";
	});
}

//ダーク/ライトモード
function toggleTheme() {
	const body = document.body;
	const themeBtn = document.querySelector('.theme-toggle');

	if (body.classList.contains('light-mode')) {
		body.classList.remove('light-mode');
		themeBtn.textContent = '🌙';
	} else {
		body.classList.add('light-mode');
		themeBtn.textContent = '☀️';
	}
}

// テーブルを生成
function generateTable() {
	const table = document.getElementById('wordTable');

	wordList.forEach((item, index) => {
		const row = table.insertRow();
		const cell1 = row.insertCell(0);
		const cell2 = row.insertCell(1);

		cell1.textContent = `${index + 1}.${item.word}`;

		const span = document.createElement('span');
		span.className = 'toggle-text';
		span.dataset.originalText = item.meaning;
		span.onclick = () => toggleText(span);

		cell2.appendChild(span);
	});
}

