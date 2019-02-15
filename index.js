const { json } = require('micro')
const fetch = require('node-fetch')
const md5 = require('./assets/md5')
const { appid, key, host } = require('./assets/configs')

module.exports = async req => {
  const { text, from, to } = await json(req)
  const salt = +new Date()
  const str = appid + text + salt + key
  const sign = md5(str)
  const params = {
    q: text, appid, salt, sign,
    from: from || 'auto',
    to: to || 'zh',
  }
  const paramsString = Object.keys(params).reduce((str, next) => `${str}&${next}=${params[next]}`, '')
  const result = await fetch(`${host}?${paramsString}`)

  return await result.json()
}

