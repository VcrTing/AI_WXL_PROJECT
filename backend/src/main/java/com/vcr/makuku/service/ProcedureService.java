package com.vcr.makuku.service;
import cn.hutool.json.JSONUtil;
import com.vcr.conf.ProcedureConf;
import com.vcr.makuku.utils.StrictSqlValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Service
public class ProcedureService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProcedureService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    //
    public List<Map<String, Object>> callProcedureWithOrderedParams(String procedureName, List<Object> paramValues) {
        if (!ProcedureConf.ALLOWED_PROCEDURES.contains(procedureName)) {
            throw new RuntimeException("Procedure '" + procedureName + "' is not supported");
        }
        // System.out.println(JSONUtil.toJsonStr(paramValues));
        // 构建调用 SQL：{call 存储过程名(?,?,?,...)}
        StringBuilder sqlBuilder = new StringBuilder("{call ");
        sqlBuilder.append(procedureName);
        if (paramValues != null && !paramValues.isEmpty()) {
            sqlBuilder.append("(");
            sqlBuilder.append("?");
            for (int i = 1; i < paramValues.size(); i++) {
                sqlBuilder.append(",?");
            }
            sqlBuilder.append(")");
        }
        sqlBuilder.append("}");

        String sql = sqlBuilder.toString();

        // 执行并返回结果集
        return jdbcTemplate.queryForList(sql, paramValues.toArray());
    }

    //
    public List<Map<String, Object>> executeSelectQuery(String rawSql) {
        // 1. 严格校验
        StrictSqlValidator.validateSelectOnly(rawSql);
        // 2. 强制追加行数限制（可选）
        String safeSql = StrictSqlValidator.appendRowLimitIfAbsent(rawSql);
        System.out.println(rawSql);
        // 3. 执行查询（数据库账号应为只读权限）
        return jdbcTemplate.queryForList(safeSql);
    }
}
