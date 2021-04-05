const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://fanyi.youdao.com',
  params: {
    keyfrom: process.env.PAPAGO_API_KEYFROM,
    key: process.env.PAPAGO_API_KEY,
    doctype: 'json',
    version: '1.1',
    type: 'data'
  }
})
