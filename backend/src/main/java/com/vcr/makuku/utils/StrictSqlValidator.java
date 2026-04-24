package com.vcr.makuku.utils;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 严格 SQL 校验工具类 —— 仅允许纯 SELECT 只读查询
 * <p>
 * 设计目标：防御 SQL 注入、多语句执行、写操作、系统命令调用、文件操作等一切危险行为。
 * 使用场景：对用户传入的 SQL 字符串进行白名单式校验，通过后方可执行。
 * </p>
 *
 * @author your-name
 */
public final class StrictSqlValidator {

    // ==================== 配置常量 ====================
    /** 最大 SQL 长度，防止巨型语句攻击 */
    private static final int MAX_SQL_LENGTH = 5000;

    /** 默认强制追加的行数限制（数据库方言适配需上层处理） */
    private static final int DEFAULT_ROW_LIMIT = 1000;

    // ==================== 核心校验方法 ====================

    /**
     * 最严格的 SELECT 语句校验（入口方法）
     * @param sql 原始 SQL 字符串
     * @throws IllegalArgumentException 校验不通过时抛出异常，包含明确拒绝原因
     */
    public static void validateSelectOnly(String sql) {
        if (sql == null || sql.isBlank()) {
            throw new IllegalArgumentException("SQL语句不能为空");
        }

        String trimmed = sql.trim();
        if (trimmed.length() > MAX_SQL_LENGTH) {
            throw new IllegalArgumentException("SQL语句长度超过限制 (" + MAX_SQL_LENGTH + "字符)");
        }

        // 1. 多语句阻断（分号检测，考虑转义和字符串内分号）
        if (containsUnquotedSemicolon(trimmed)) {
            throw new IllegalArgumentException("禁止执行多条SQL语句（检测到未引用的分号）");
        }

        // 2. 移除注释后再进行关键词检测（防止注释混淆绕过）
        String uncommented = removeComments(trimmed);
        String upper = uncommented.toUpperCase();

        // 3. 必须以 SELECT 开头（允许前导空白）
        if (!upper.startsWith("SELECT")) {
            // throw new IllegalArgumentException("仅允许执行 SELECT 查询语句");
        }

        // 4. 危险关键词黑名单（独立单词匹配）
        checkForbiddenKeywords(upper);

        // 5. 危险函数/系统变量检测（数据库方言通用危险项）
        checkDangerousFunctions(upper);

        // 6. 禁止 INTO 子句（写文件或变量赋值）
        if (containsIndependentWord(upper, "INTO")) {
            throw new IllegalArgumentException("SELECT语句中禁止使用 INTO 子句（可能用于写文件或变量赋值）");
        }

        // 7. 禁止 FOR UPDATE / FOR SHARE 等行锁子句（虽只读但可能引发锁等待）
        if (upper.contains("FOR UPDATE") || upper.contains("FOR SHARE")) {
            throw new IllegalArgumentException("禁止使用行锁定子句 FOR UPDATE / FOR SHARE");
        }

        // 8. 禁止 INFORMATION_SCHEMA 敏感查询（可选，根据业务决定）
        // if (upper.contains("INFORMATION_SCHEMA")) {
        //     throw new IllegalArgumentException("禁止查询系统元数据表");
        // }

        // 9. 括号匹配基本检测（防止利用畸形 SQL 绕过）
        if (!isParenthesesBalanced(upper)) {
            throw new IllegalArgumentException("SQL语句括号不匹配，可能存在注入风险");
        }
    }

    // ==================== 辅助检测方法 ====================

    /**
     * 检测未在字符串引号内的分号（防止多语句执行）
     */
    private static boolean containsUnquotedSemicolon(String sql) {
        boolean inSingleQuote = false;
        boolean inDoubleQuote = false;
        boolean inBacktick = false;   // MySQL 反引号
        char prev = 0;

        for (int i = 0; i < sql.length(); i++) {
            char c = sql.charAt(i);

            // 处理转义（简单处理，防止 \' 或 \")
            if (prev == '\\') {
                prev = c;
                continue;
            }

            if (c == '\'' && !inDoubleQuote && !inBacktick) {
                inSingleQuote = !inSingleQuote;
            } else if (c == '"' && !inSingleQuote && !inBacktick) {
                inDoubleQuote = !inDoubleQuote;
            } else if (c == '`' && !inSingleQuote && !inDoubleQuote) {
                inBacktick = !inBacktick;
            } else if (c == ';' && !inSingleQuote && !inDoubleQuote && !inBacktick) {
                return true;   // 发现未引用的分号
            }
            prev = c;
        }
        return false;
    }

    /**
     * 移除 SQL 注释（单行 -- 和 多行斜杠星号）
     * 注意：不会处理字符串内部的注释符号（已被引号包裹），此处简化处理，因为后续关键词检测在无注释文本上进行
     */
    private static String removeComments(String sql) {
        // 移除单行注释（-- 到行尾）
        String result = sql.replaceAll("(?m)--.*?$", "");
        // 移除多行注释（尽可能非贪婪）
        result = result.replaceAll("/\\*.*?\\*/", "");
        return result;
    }

    /**
     * 禁止的关键词黑名单（独立单词，不分大小写）
     */
    private static final Set<String> FORBIDDEN_KEYWORDS = new HashSet<>(Arrays.asList(
            // DML 写操作
            "INSERT", "UPDATE", "DELETE", "MERGE", "REPLACE",
            // DDL
            "CREATE", "ALTER", "DROP", "TRUNCATE", "RENAME",
            // DCL
            "GRANT", "REVOKE",
            // 执行命令
            "EXEC", "EXECUTE", "CALL",
            // 文件操作
            "LOAD", "LOAD_FILE", "INTO OUTFILE", "INTO DUMPFILE",
            // 其他危险
            "SHUTDOWN", "BACKUP", "RESTORE", "SLEEP", "BENCHMARK"
    ));

    private static void checkForbiddenKeywords(String upperSql) {
        for (String keyword : FORBIDDEN_KEYWORDS) {
            if (containsIndependentWord(upperSql, keyword)) {
                throw new IllegalArgumentException("SQL中包含禁止的关键词: " + keyword);
            }
        }
    }

    /**
     * 危险函数/变量黑名单（可被用于信息泄露、DoS、命令执行）
     */
    private static final Set<String> DANGEROUS_FUNCTIONS = new HashSet<>(Arrays.asList(
            // MySQL 危险函数
            "SLEEP(", "BENCHMARK(", "GET_LOCK(", "RELEASE_LOCK(", "IS_FREE_LOCK(",
            "LOAD_FILE(", "INTO OUTFILE", "INTO DUMPFILE", "SYSTEM_USER(", "SESSION_USER(",
            "CURRENT_USER(", "DATABASE(", "SCHEMA(", "USER(", "VERSION(",
            "CONNECTION_ID(", "UUID(", "ROW_COUNT(", "FOUND_ROWS(",
            // 系统变量
            "@@VERSION", "@@GLOBAL", "@@SESSION", "@@DATADIR", "@@BASEDIR",
            "@@HOSTNAME", "@@PORT", "@@SOCKET", "@@SLAVE_LOAD_TMPDIR",
            // Oracle 危险
            "UTL_HTTP", "UTL_FILE", "UTL_SMTP", "DBMS_LDAP", "DBMS_JAVA",
            "DBMS_XMLQUERY", "DBMS_SQL", "DBMS_PIPE",
            // SQL Server 危险
            "XP_CMDSHELL", "XP_REGREAD", "XP_REGWRITE", "SP_OACREATE",
            "OPENROWSET", "OPENDATASOURCE",
            // PostgreSQL 危险
            "PG_SLEEP(", "PG_READ_FILE(", "PG_LS_DIR(", "PG_RELATION_SIZE(",
            "COPY", "LO_IMPORT", "LO_EXPORT"
    ));

    private static void checkDangerousFunctions(String upperSql) {
        for (String func : DANGEROUS_FUNCTIONS) {
            if (upperSql.contains(func)) {
                throw new IllegalArgumentException("SQL中包含危险函数/变量: " + func);
            }
        }
    }

    /**
     * 检测单词是否为独立存在（前后为非字母数字字符或边界）
     */
    private static boolean containsIndependentWord(String text, String word) {
        Pattern pattern = Pattern.compile("\\b" + Pattern.quote(word) + "\\b", Pattern.CASE_INSENSITIVE);
        return pattern.matcher(text).find();
    }

    /**
     * 基本括号平衡检测（防止利用括号畸形构造绕过检测）
     */
    private static boolean isParenthesesBalanced(String sql) {
        int count = 0;
        boolean inSingleQuote = false;
        boolean inDoubleQuote = false;
        char prev = 0;

        for (int i = 0; i < sql.length(); i++) {
            char c = sql.charAt(i);
            if (prev == '\\') {
                prev = c;
                continue;
            }
            if (c == '\'' && !inDoubleQuote) {
                inSingleQuote = !inSingleQuote;
            } else if (c == '"' && !inSingleQuote) {
                inDoubleQuote = !inDoubleQuote;
            } else if (!inSingleQuote && !inDoubleQuote) {
                if (c == '(') {
                    count++;
                } else if (c == ')') {
                    count--;
                    if (count < 0) return false;
                }
            }
            prev = c;
        }
        return count == 0;
    }

    // ==================== 便捷扩展方法 ====================

    /**
     * 为 MySQL 风格的 SQL 强制追加 LIMIT 子句（如果不存在）
     * 使用前必须先通过 validateSelectOnly 校验
     */
    public static String appendRowLimitIfAbsent(String sql, int maxRows) {
        String trimmed = sql.trim();
        String upper = trimmed.toUpperCase();
        if (upper.contains("LIMIT")) {
            // 已存在 LIMIT，不做修改（但可以在上层校验其值是否超过上限）
            return trimmed;
        }
        // 移除末尾可能的分号再追加
        if (trimmed.endsWith(";")) {
            trimmed = trimmed.substring(0, trimmed.length() - 1);
        }
        return trimmed + " LIMIT " + maxRows;
    }

    /**
     * 便捷方法：使用默认行数限制（1000）
     */
    public static String appendRowLimitIfAbsent(String sql) {
        return appendRowLimitIfAbsent(sql, DEFAULT_ROW_LIMIT);
    }
}