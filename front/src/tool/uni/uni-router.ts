import { PAGES } from "@/conf/conf-page"


class Router {
    // 统一用绝对路径
    _ser(url: string = '') { return url.startsWith('/') ? url : ('/' + url) }

    // 弹出错误消息
    _err(err: UniAppMiniError) { 
        console.log('弹出页面跳转错误 =', err)
    }

    // 返回上一级
    back() {
        try {
            uni.navigateBack()
        }
        catch(err: any) { this._err(err) }
    }

    // 保留当前页面, 跳转到其他页面
    go (url: string) {
        try {
            uni.navigateTo({
                url: this._ser(url)
            })
        }
        catch(err: any) { this._err(err) }
    }

    gopg (name: string) {
        this.go( PAGES[ name ] )
    }

    // 重定向到 其他页面
    red (url: string) {
        try {
            uni.redirectTo({
                url: this._ser(url)
            })
        }
        catch(err: any) { this._err(err) }
    }
    redpg (name: string) {
        this.red( PAGES[ name ] )
    }

    // 重定向到 其他页面，但是关闭所有页面
    launch (url: string) {
        try {
            uni.reLaunch({
                url: this._ser(url)
            })
        }
        catch(err: any) { this._err(err) }
    }
    launchpg (name: string) {
        this.launch( PAGES[ name ] )
    }

    // 跳转到 导航栏目
    navigator (url: string) {
        try {
            uni.switchTab({
                url: this._ser(url)
            })
        }
        catch(err: any) { this._err(err) }
    }
    navigatorpg (name: string) {
        this.navigator( PAGES[ name ] )
    }

    // 获取当前页面的 page 数据
    info (): Page.PageInstance {
        const routes = getCurrentPages()
        const route = routes[ routes.length - 1 ]
        return route ? route : { }
    }

    goui() {
        this.gopg('ui')
    }
}

const uniRouter = new Router();
export default uniRouter