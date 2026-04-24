
const replace_txt = (sql: string, v: string, __name: string = 'codeParam') => {
    return sql.replace('#' + __name + '#', v || '')
}

export default {
    replace_txt
}