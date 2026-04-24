
// LOGIN
// 获取 TOKEN
const gettoken = (successCaii: Function, failCaii: Function) => {
    uni.login({
        provider: 'weixin',
        onlyAuthorize: true,
        success: (e) => {
            const code: string = e.code;
            // 获取 微信 的 TOKEN
            if (successCaii) successCaii(e, code)
        },
        fail: (err) => {
            console.log('初步登录失败 = ', err)
            if (failCaii) failCaii(err)
        }
    })
}

// 用户信息
const getuserinfo = (success: Function, fail: Function) => {
    // 获取用户数据
    uni.getUserProfile({
        desc: '完善用户资料',
        success: (res) => {
            const info = res.userInfo
            console.log('用户 信息 =', info)
            if (success) {
                success(info)
            }
        },
        fail: (err) => {
            console.log('获取用户登录数据失败 =', err)
            // 打开设置
            uni.getSetting({
                success: (res) => {
                    const sui = res.authSetting['scope.userInfo'];
                    if (!sui) {
                        // 打开 用户信息 失败
                        uni.showModal({
                            title: '授权提示',
                            content: '需要用户信息权限才能继续使用',
                            success: (modres) => {
                                if (modres.confirm) {
                                    // 打开用户信息
                                    uni.openSetting({
                                        success: (openres) => {
                                            const openui = openres.authSetting['scop.userInfo']
                                            if (openui) {
                                                console.log('全部工作完成，继续获取用户信息');
                                                // 继续获取用户信息

                                            }
                                        },
                                        fail: () => {
                                            uni.showToast({ title: '打开授权设置失败', icon: 'none' })
                                        }
                                    })
                                }   
                            },
                        })
                    }
                },
            })
        }
    })
}

export default {
    gettoken,
    getuserinfo
}