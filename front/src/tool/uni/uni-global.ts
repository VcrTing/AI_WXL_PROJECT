import { promise } from "../util/future";


// 设置 全局 数据
export const init_global_data = () => new Promise((rev) => {
  const data: ONE = {
      jwt: ''
  }

  const global: AnyObject | undefined = getApp().globalData
  if (global) {
    for (const k in data) { global[ k ] = data[ k ] }
    console.log('全局数据 =', getApp().globalData)
  }
  else {
    console.log('弹出全局变量失效错误')
  }
  rev(true)
})

export const tipsucc = (title: string = '操作成功。') => {
  uni.showToast({ title, icon: 'none' })
}

export const tipwarn = (title: string = '警告') => {
  uni.showToast({ title, icon: 'none' })
}

export const tiperr = (title: string = '错误') => {
  uni.showToast({ title, icon: 'none', duration: 3400 })
}

export const tipiong = (title: string = '您好') => {
  uni.showToast({ title, icon: 'none', duration: 4400 })
}

export const netip = <T>(src: NET_RES, def: T): T => {
  tiperr(src + '')
  return def
}

export const tiperror = (func: Function) => {
  try {
    func()
  }
  catch (err: any) {
    tiperr(err ? err.message : '[-1] 未知错误')
  }
} 