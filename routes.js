const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const fs = require('fs')


router.get('/', (req, res, next) => {
    res.render('index')
})

router.post('/upload', multipartMiddleware, (req, res) => {

    if (req.headers.origin === 'http://192.168.1.103:8081') {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
        res.setHeader('Access-Control-Allow-Credentials', true);
    }

    console.log(req.body)
    console.log(req.files)
    // 从 req.files 获取前端传过来的文件
    // 从 req.body 中获取其他 key
    // 如果前端 new FormData().append('filename', <File对象>)
    // 那么可以通过 req.files.filename 获取到该对象
    // 而且 req.files.filename.fieldName 就是你 formData 中 key 值

    // req.files 对象结构如下：
    // {
    //     filename: {
    //       fieldName: 'filename',
    //       originalFilename: '方形-512.png',
    //       path: '/var/folders/qq/zv3m8q555wsdpr42p4kd92300000gn/T/nSXIzDU4M_sGyzxlilr-yTf8.png',
    //       headers: {
    //         'content-disposition': 'form-data; name="filename"; filename="方形-512.png"',
    //         'content-type': 'image/png'
    //       },
    //       size: 13516,
    //       name: '方形-512.png',
    //       type: 'image/png'
    //     }
    //   }

    const { type, size, path, name } = req.files.filename

    let curType = type.split('/')[1]

    if (!['jpeg', 'jpg', 'png'].includes(curType)) {
        res.send({ errMsg: '请上传 png、jpg、jpeg 格式的图片' })
        return
    } else if (false) {
        // 还可以限制图片大小等等
    } else {
        fs.readFile(path, (err, data) => {
            if (err) {
                res.send({ errMsg: '图片上传失败' })
                return
            }
            // 图片转化为字节
            let base64Str = new Buffer(data).toString('base64')
            // 写入本地
            fs.writeFileSync(`./upload/${name}`, base64Str, 'base64')
            res.send({ errMsg: 'ok' })
            return
        })
    }
})

module.exports = router