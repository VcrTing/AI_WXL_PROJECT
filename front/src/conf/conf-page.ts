
export const PAGE_FOLDER_NAME = 'pages'

const index: string = PAGE_FOLDER_NAME + '/index'
const user: string = PAGE_FOLDER_NAME + '/user/user'

export const PAGES: ONE = {
    index, user,
    'ui': PAGE_FOLDER_NAME + '/home/ui',
    'login': PAGE_FOLDER_NAME + '/auth/login/login',
    'mark': PAGE_FOLDER_NAME + '/mark/mark',
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
