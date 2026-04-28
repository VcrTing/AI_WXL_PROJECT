

/**
 * master ====================================================================================================
 */

// 用户
const NET_ENDPOINT_USER = <ONE>{
    'user': 'users',
}
// 通用
const NET_ENDPOINT_COMMON = <ONE> {
    
}
// 登录后才能查看的系统消息
const NET_ENDPOINT_SYSTEM = <ONE> {
    'global': 'global'
}

/*
-------------------------------------------------------------------
*/

// APP, 无需 TOKEN 的 strapi
export const NET_ENDPOINTS_APP = <ONE>{
    ...NET_ENDPOINT_SYSTEM,
    'login': 'auth/local',
}

export const NET_ENDPOINTS_BKD = <ONE>{
    'login': 'auth/login',
    // 工资
    'salary_type': 'money/salary/salary-types'
}

const __BUSINRSS_SQL = <ONE>{
    "proc": "backend/sql/exec/procedure",
    "select": "backend/sql/exec/select"
}
const __BUSINRSS_REPORT_STONE = <ONE>{
    "bb_master_list": "business/report/stone/master/list"
}
export const NET_ENDPOINTS_BUSINESS = <ONE>{
    ...__BUSINRSS_SQL,
    ...__BUSINRSS_REPORT_STONE
}

export const NET_ENDPOINT_FILE = <ONE> {
    'upload': 'upload',
    'any': 'medias/upload/one'
}