import java.io.*;
import java.nio.file.*;
import java.util.regex.*;

public class replace {
    public static void main(String[] args) throws IOException {
        /*
         * htmlを% java replace **.html でよみこむと
         * 「」で囲まれた文字列を文字をhiden_text.htmlのテンプレで文字を隠せるように書き換えるやつ
         */
        String fileName = args[0];
        String content = new String(Files.readAllBytes(Paths.get(fileName)));

        Pattern pattern = Pattern.compile("「(.*?)」");
        Matcher matcher = pattern.matcher(content);

        StringBuffer result = new StringBuffer();
        while (matcher.find()) {
            String original = matcher.group(1);
            String replacement = "\n<span class=\"toggle-text\" data-original-text=\"" + original
                    + "\" onclick=\"toggleText(this)\"></span>\n";
            matcher.appendReplacement(result, Matcher.quoteReplacement(replacement));
        }
        matcher.appendTail(result);

        result.append("\n");

        Files.write(Paths.get("output_" + fileName), result.toString().getBytes());
    }
}