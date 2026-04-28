
export const PAGE_FOLDER_NAME = 'pages'

const index: string = PAGE_FOLDER_NAME + '/index'
const user: string = PAGE_FOLDER_NAME + '/user/user'
const home: string = PAGE_FOLDER_NAME + '/home/home'

// 钱
const PAG_MONEY = {
    'money_salary_type': PAGE_FOLDER_NAME + '/money/salary/salary_type'
}

export const PAGES: ONE = {
    index, user, home,
    'ui': PAGE_FOLDER_NAME + '/home/ui',
    'login': PAGE_FOLDER_NAME + '/auth/login/login',
    'mark': PAGE_FOLDER_NAME + '/mark/mark',
    ...PAG_MONEY
}

// 白名单 页面
export const PAGE_WHITE_LIST = [
    PAGES['login'],
    index
]

// UNIAPP NAVI BAR 页面
export const PAGE_NAVIGATION: string[] = [
    'index', 'user', 'mark'
]

// 
