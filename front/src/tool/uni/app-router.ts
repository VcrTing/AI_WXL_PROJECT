import uniRouter from "./uni-router"

export default {
    login: () => {
        uniRouter.gopg('login')
    },
    index: () => {
        uniRouter.navigatorpg('index')
    },
    // 重定向到用户
    user: () => {
        uniRouter.navigatorpg('user')
    }

}