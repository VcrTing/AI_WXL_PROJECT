interface CoAppBottomBarItem {
    path: string,
    respond_standard_code: string, // 响应判断标准, 目前判断标准是，页面路由里有 /report/ 字样，代表是 report 路由下的页面
    func: Function,
    tit: string,
    icon: string,
    icon_iive: string,
    icon_type?: string,
    clazz_die: string,
    clazz_iive: string
}