// ダーク/ライトモード
function toggleTheme() {
	const body = document.body;
	const themeBtn = document.querySelector('.theme-toggle');

	if (body.classList.contains('dark-mode')) {
		body.classList.remove('dark-mode');
		themeBtn.textContent = '🌓';
		localStorage.setItem('theme', 'light');
	} else {
		body.classList.add('dark-mode');
		themeBtn.textContent = '☀️';
		localStorage.setItem('theme', 'dark');
	}
}

// ページ読み込み時にテーマを設定
document.addEventListener('DOMContentLoaded', function () {
	const body = document.body;
	const themeBtn = document.querySelector('.theme-toggle');
	const savedTheme = localStorage.getItem('theme');

	// 保存されたテーマがあればそれを使い、なければライトモードをデフォルトに
	if (savedTheme === 'dark') {
		body.classList.add('dark-mode');
		themeBtn.textContent = '☀️';
	} else {
		// 初回訪問時またはテーマが未設定の場合はライトモードを強制
		body.classList.remove('dark-mode');
		themeBtn.textContent = '🌙';
		localStorage.setItem('theme', 'light');
	}
});

// 初期化：全てを非表示（空白）に
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-text").forEach(el => {
        // 現在のテキストを data-original-text に保存
        const originalText = el.textContent.trim();
        if (originalText) {
            el.dataset.originalText = originalText;
        }
        // 空白に置き換え
        el.textContent = convertToBlank(el.dataset.originalText || originalText);
    });
});

// 文字列を空白に変換する関数
function convertToBlank(text) {
    let result = "";
    for (let char of text) {
        if (char.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
            result += "　"; // 全角スペース
        } else {
            result += " ";  // 半角スペース
        }
    }
    return result;
}

// 個別トグル
function toggleText(el) {
    const original = el.dataset.originalText;
    if (!original) return;

    const isBlank = el.textContent.trim() === "";
    if (isBlank) {
        el.textContent = original;
    } else {
        el.textContent = convertToBlank(original);
    }
}

// 全体の表示状態を保持
let allVisible = false;

// 一括表示/非表示トグル
function toggleAll() {
    const elements = document.querySelectorAll(".toggle-text");
    const buttons = document.querySelectorAll(".toggle-all-btn");

    elements.forEach(el => {
        const original = el.dataset.originalText;
        if (!original) return;
        el.textContent = allVisible ? convertToBlank(original) : original;
    });

    allVisible = !allVisible;

    buttons.forEach(btn => {
        btn.textContent = allVisible ? "すべて非表示にする" : "すべて表示する";
    });
}

// 一括表示
function toggleAllOriginal() {
    document.querySelectorAll(".toggle-text").forEach(el => {
        const original = el.dataset.originalText;
        if (original) el.textContent = original;
    });
    allVisible = true;
    document.querySelectorAll(".toggle-all-btn").forEach(btn => {
        btn.textContent = "すべて非表示にする";
    });
}

// 一括非表示
function toggleAllDelate() {
    document.querySelectorAll(".toggle-text").forEach(el => {
        const original = el.dataset.originalText;
        if (original) el.textContent = convertToBlank(original);
    });
    allVisible = false;
    document.querySelectorAll(".toggle-all-btn").forEach(btn => {
        btn.textContent = "すべて表示する";
    });
}