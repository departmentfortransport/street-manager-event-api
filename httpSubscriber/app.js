const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const app = express()
const port = 3000
const messageValidator = require('./messageValidator')

app.use(bodyParser.text())

app.post('/', async (req, res) => {
  const body = JSON.parse(req.body)

  if (req.get('x-amz-sns-message-type') == null){
    return
  }

  if (await messageValidator.isValidSignature(body)){
    handleMessage(body)
  } else {
    throw 'Message signature is not valid'
  }
})

app.listen(port, () => console.log(`HTTP subscriber listening at http://localhost:${port}`))

function handleMessage(body){
  switch(body.Type) {
    case 'SubscriptionConfirmation':
      confirmSubscription(body.SubscribeURL)
      break
    case 'Notification':
      handleNotification(body)
      break
    default:
      return
  }
}

function confirmSubscription(subscriptionUrl){
  https.get(subscriptionUrl)
  console.log('Subscription confirmed')
}

function handleNotification(body){
  console.log(`Received message from SNS: ${body.Message}`)
}
