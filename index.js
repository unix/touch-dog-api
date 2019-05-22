const { json } = require('micro')
const { translate } = require('./utils')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { text } = await json(req)
  const target = await translate(text)
  
  return {
    trans_result: [{
      src: text,
      dst: target,
    }]
  }
}
