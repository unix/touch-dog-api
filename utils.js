const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID2,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY2,
  region: 'ap-southeast-1',
})
const handler = new AWS.Translate()

const translate = async (text) => {
  return new Promise((resolve) => {
    handler.translateText({
      Text: text,
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'zh',
    }, (err, data) => {
      console.log(typeof data, data, 2, err)
      if (err || !data.TranslatedText) return resolve('')
      resolve(data.TranslatedText)
    })
  })
}

module.exports = {
  translate,
}
