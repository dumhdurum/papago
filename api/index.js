const statuses = require('statuses')
const papago = require('../lib/papago')

function transformKeys({
  translation = [],
  basic = {},
  web = [],
  query,
  errorCode
}) {
  const { phonetic, explains = [] } = basic
  const translations = web.map(({ key, value }) => ({
    values: value,
    key
  }))

  if (errorCode !== 0) {
    return {
      errorCode
    }
  }

  return {
    translation: translation[0],
    translations,
    phonetic,
    explains,
    query
  }
}

module.exports = async (request, response) => {
  const { data } = await papago.get('/openapi.do', {
    params: { ...request.query }
  })

  const result = transformKeys(data)

  if (!result.errorCode) {
    return response.json(result)
  }

  return response.status(422).json({
    message: statuses(422)
  })
}
