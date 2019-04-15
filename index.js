const { json } = require('micro')
const fetch = require('node-fetch')
const host = 'https://api.cognitive.microsofttranslator.com/translate'
const tranlsatorKey = process.env.TRANSLATOR_TEXT_KEY

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { text, from, to } = await json(req)
  const query = `api-version=3.0&from=${from}&to=${to}`;
  const response = await fetch(`${host}?${query}`, {
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': tranlsatorKey,
      'Content-type': 'application/json',
    },
    body: JSON.stringify([{ text }]),
  })
  const results = await response.json()
  const customRes = { trans_result: [] }
  if (!results || !results[0].translations) return customRes
  customRes.trans_result = results[0].translations.map(item => ({
    src: text,
    dst: item.text,
  }))
  return customRes
}

