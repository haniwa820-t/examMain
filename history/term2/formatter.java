import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

public class formatter {
	public static void main(String[] args) {
		final int numberOfFiles = 5;
		String[] txtName = new String[numberOfFiles];
		String[] tsvName = new String[numberOfFiles];
		ArrayList<String> templateFront = templateIn("templateFront.html");
		ArrayList<String> templateBack = templateIn("templateBack.html");
		for (int i = 0; i < numberOfFiles; i++) {
			txtName[i] = i + 1 + ".txt";
			tsvName[i] = i + 1 + ".csv";
		}
		if (Files.exists(Paths.get(txtName[0]))) {
			for (int i = 0; i < numberOfFiles; i++) {
				ArrayList<String> txt = inputTxt(txtName[i]);
				ArrayList<String> ans = inputTsv(tsvName[i]);
				txt = formatHtml(txt);// 歴史仕様
				outputHtml(ans, txt, i, templateFront, templateBack);
			}
		} else {
			System.out.print("ファイルを作成します。");
			for (int i = 0; i < numberOfFiles; i++) {
				createFile(txtName[i]);
				createFile(tsvName[i]);
			}
		}
	}

	static ArrayList<String> templateIn(String fileName) {
		ArrayList<String> result = new ArrayList<String>();
		BufferedReader fin = null;
		try {
			fin = new BufferedReader(new FileReader(fileName));
			String line;
			while ((line = fin.readLine()) != null) {
				result.add(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fin != null) {
				try {
					fin.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	static void createFile(String fileName) {
		BufferedWriter fout = null;
		try {
			fout = new BufferedWriter(new FileWriter(fileName));
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fout != null) {
				try {
					fout.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return;
	}

	static void outputHtml(ArrayList<String> ans, ArrayList<String> txt, int index, ArrayList<String> tmpF,
			ArrayList<String> tmpB) {
		BufferedWriter fout = null;
		index++;
		String fileName = "print" + index + ".html";
		String hideFront = "<span class=\"toggle-text\" data-original-text=\"";
		String hideBack = "\" onclick=\"toggleText(this)\"></span>";
		try {
			fout = new BufferedWriter(new FileWriter(fileName));

			for (String string : tmpF)
				fout.write(string + "\n");
			fout.newLine();

			for (String string : txt) {
				String[] split = string.split("「」|『』");// ここバクの温床
				if (split.length == 1) {
					split = string.split("〔〕");
				}
				for (int i = 0; i < split.length - 1; i++) {
					fout.write(split[i]);
					if (!ans.isEmpty()) {
						fout.write(hideFront + ans.remove(0) + hideBack);
					} else {
						fout.write("[NO_ANSWER]");
					}
				}
				fout.write(split[split.length - 1]);
				fout.newLine();
			}

			fout.newLine();
			for (String string : tmpB)
				fout.write(string + "\n");

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fout != null) {
				try {
					fout.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return;
	}

	static ArrayList<String> formatHtml(ArrayList<String> txt) {
		ArrayList<String> result = new ArrayList<String>();
		String buttonAll = "\n<button id=\"toggleAllButton\" onclick=\"toggleAll()\">すべて表示する</button>\n";
		for (int i = 0; i < txt.size(); i++) {
			String line = txt.get(i);
			if (line.length() == 0) {
				continue;
			}
			switch (line.charAt(0)) {
				case '$':
					result.add("<h2>" + line.substring(1, line.length()) + "</h2>");
					break;
				case '[':
					result.add(buttonAll + "<h3>"
							+ line + "</h3>");
					break;
				case '*':
					result.add(buttonAll + "<h3>"
							+ line.substring(1, line.length()) + "</h3>");
					break;
				case '〇':
					result.add("<h4>" + line + "</h4>");
					break;
				case '-':
					result.add("<h4>" + line.substring(1, line.length()) + "</h4>");
					break;
				default:
					result.add(line + "</br>");
					break;
			}
		}
		return result;
	}

	static ArrayList<String> inputTsv(String fileName) {
		ArrayList<String> result = new ArrayList<String>();
		BufferedReader fin = null;
		try {
			fin = new BufferedReader(new FileReader(fileName));
			String line;
			while ((line = fin.readLine()) != null) {
				result.add(line);// .split("\t")[1]
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fin != null) {
				try {
					fin.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	static ArrayList<String> inputTxt(String fileName) {
		ArrayList<String> result = new ArrayList<String>();
		BufferedReader fin = null;
		try {
			fin = new BufferedReader(new FileReader(fileName));
			String line;
			while ((line = fin.readLine()) != null) {
				if (!line.equals("")) {
					line = line.replaceAll("\s", "");// ここの\sを\\sにしろと言われた、直さなくても動く
					line = line.replace("　", "");
					result.add(line);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fin != null) {
				try {
					fin.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
}
