document.addEventListener('DOMContentLoaded', function () {
	// ヘッダー要素を作成
	const header = document.createElement('header');
	header.className = 'top-bar';

	// メニューラッパーを作成
	const menuWrapper = document.createElement('div');
	menuWrapper.className = 'menu-wrapper';

	// チェックボックス（メニュートグル）を作成
	const menuToggle = document.createElement('input');
	menuToggle.type = 'checkbox';
	menuToggle.id = 'menu-toggle';
	menuToggle.hidden = true;

	// メニューアイコン（ハンバーガーメニュー）を作成
	const menuIcon = document.createElement('label');
	menuIcon.className = 'menu-icon';
	menuIcon.htmlFor = 'menu-toggle';

	// ハンバーガーメニューの線を追加
	for (let i = 0; i < 3; i++) {
		const span = document.createElement('span');
		menuIcon.appendChild(span);
	}

	// オーバーレイを作成
	const overlay = document.createElement('div');
	overlay.className = 'overlay';

	// ナビゲーションメニューを作成
	const nav = document.createElement('nav');
	nav.className = 'menu';

	// メニューリストを作成
	const ul = document.createElement('ul');

	// メニュー項目を追加
	const menuItems = [
		{ text: 'HOME', href: '../../index.html'}
	];

	menuItems.forEach(item => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = item.href;
		a.textContent = item.text;
		li.appendChild(a);
		ul.appendChild(li);
	});

	// テーマ切り替えボタンを作成
	const themeToggle = document.createElement('button');
	themeToggle.className = 'theme-toggle';
	themeToggle.textContent = '🌓';
	themeToggle.onclick = toggleTheme;

	// 要素を組み立てる
	nav.appendChild(ul);
	menuWrapper.appendChild(menuToggle);
	menuWrapper.appendChild(menuIcon);
	menuWrapper.appendChild(overlay);
	menuWrapper.appendChild(nav);
	header.appendChild(menuWrapper);
	header.appendChild(themeToggle);

	// ドキュメントに追加（bodyの先頭に追加する場合）
	document.body.insertBefore(header, document.body.firstChild);
});