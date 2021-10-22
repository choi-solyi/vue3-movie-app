exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'choi-solyi',
      age: 31,
      email: 'choi-solyi@naver.com'
    })
  }
}