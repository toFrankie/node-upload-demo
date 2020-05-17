const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const template = require('art-template')

const app = express()
const port = 3000

// create application/json parser
let jsonParser = bodyParser.json()

// 设置post文件大小
// app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.set('views', path.join(__dirname, 'views'))
template.config('base', '')
template.config('extname', '.html')
app.engine('.html', template.__express)
app.set('view engine', 'html')
app.use('/', routes)

app.listen(port, () => {
    console.log('http://127.0.0.1:%s', port)
})