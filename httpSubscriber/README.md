# Sample HTTP SNS Subscriber

## Description
Simple node express application that can confirm subscription to an AWS SNS Topic and process messages that are published to subscribed topics

### app.js
Main function that receives /POST requests:
- Only processes messages from SNS by checking the presence of `x-amz-sns-message-type` header
- Verifies the signature included in the message is from AWS SNS - messageValidator.js
- Depending on the message type, it will confirm a subscription or print out the message received


### messageValidator.js
Checks signature version and verifies message signature by:
- Downloading certificate from provided certificate url
- Encrypting message with the certificate and verifying that the encrypted message matches the signature provided

Futher information here:
https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html
