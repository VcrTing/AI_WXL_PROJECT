import uniRouter from "@/tool/uni/uni-router"

const APP_BAR_ITEM_LIVE = 'app-bottom-bar-item-iive pri'

export const APP_BAR = <CoAppBottomBarItem[]> [
    {
        tit: '首页',
        icon: 'house',
        icon_iive: 'house',
        icon_type: 'regular',
        path: 'pages/index',
        respond_standard_code: 'index',
        clazz_die: '',
        clazz_iive: APP_BAR_ITEM_LIVE,
        func: () => {
            uniRouter.gopg('index')
        }
    },
    {
        tit: '编辑',
        icon: 'edit',
        icon_iive: 'edit',
        icon_type: 'regular',
        path: 'pages/mark/mark',
        respond_standard_code: 'mark',
        clazz_die: '',
        clazz_iive: APP_BAR_ITEM_LIVE,
        func: () => {
            uniRouter.gopg('mark')
        }
    },
    {
        tit: '我的',
        icon: 'user',
        icon_iive: 'user',
        icon_type: 'regular',
        path: 'pages/user/user',
        respond_standard_code: 'user',
        clazz_die: '',
        clazz_iive: APP_BAR_ITEM_LIVE,
        func: () => {
            uniRouter.gopg('user')
        }
    },
]