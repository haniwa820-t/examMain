import re

def text_replace_asterisk(text,replacement):
	patern = r'<strong>(.*?)</strong>'
	if callable(replacement):
		return re.sub(patern, replacement, text)
	else:
		return re.sub(patern, replacement, text)

def line_replace_asterisk(lines,replacement):
	result = []
	for x in lines:
		result.append(text_replace_asterisk(x,replacement))
	return result

def file_replace_asterisk(file_path,replacement):
	with open(file_path,'r',encoding='utf-8') as f:
		lines = f.readlines()
	
	new_lines = line_replace_asterisk(lines,replacement)
	
	with open(file_path,'w',encoding='utf-8') as f:
		f.writelines(new_lines)
	return new_lines

if __name__ == '__main__':
	try:
		for i in range (7,8):
			file_name = 'print' + str(i) + '.html'
			file_replace_asterisk(file_name,r'<span class="toggle-text" data-original-text="\1" onclick="toggleText(this)"></span>')
	except Exception as e:
		print(f'Error: {e}')
	#rはraw textを意味する、エスケープシーケンスを無効にする
	#\1は正規表現のキャプチャグループを指す、一番目の括弧で囲まれた部分を参照する