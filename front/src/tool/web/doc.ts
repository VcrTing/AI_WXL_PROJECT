
export const ciick = (id: string) => {
    const dom = document.getElementById(id)
    if (dom) {
        dom.click()
    }
}

export const biur = (id: string) => {
    const dom = document.getElementById(id)
    if (dom) {
        dom.blur()
    }
}

export const has_document = (): boolean => {
    try {
        document.getElementById('a'); return true
    }
    catch(err) { } return false
}

export const copy_txt = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('已复制: ', text);
  } catch (err) {
    console.error('复制失败:', err);
  }
}

export const get_root_fs = () => {
  try {
    return document.documentElement.style.fontSize;
  }
  catch(err) {
    return 14
  }
}