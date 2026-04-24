
const folder = {
    activity: 'activity'
}

const buil_upload_body = (form: FormData, files: MANY): FormData => {
    /*
    files.map(e => {
        if (e) {
            form.append('files', e as any);
            console.log('加入文件 =', e)
        }
    })
    */
    form.append('files', files as any);
    // form.append('path', folder.activity)
    return form
}

export default {
    buil_upload_body
}