const url = require('url');
const crypto = require('crypto')
const axios = require('axios')

async function isValidSignature(body) {

  verifyMessageSignatureVersion(body.SignatureVersion)

  const certificate = await downloadCertificate(body.SigningCertURL)
  return validateSignature(body, certificate)
}

function verifyMessageSignatureVersion(version) {
  if (version != 1){
    throw "Signature verification failed"
  }
}

function verifyMessageSignatureURL(certURL) {
  if (url.parse(certURL).protocol != 'https:') {
    throw "SigningCertURL was not using HTTPS"
  }
}

async function downloadCertificate(certURL){
  verifyMessageSignatureURL(certURL)

  try {
    const response = await axios.get(certURL)
    return response.data
  } catch (err){
    throw `Error fetching certificate: ${err}`
  }
}

async function validateSignature(message, certificate) {
  const verify = crypto.createVerify('sha1WithRSAEncryption');
  verify.write(getMessageToSign(message))
  verify.end();

  return verify.verify(certificate, message.Signature, 'base64')
}

function getMessageToSign(body){
  switch(body.Type) {
    case 'SubscriptionConfirmation':
      return buildSubscriptionStringToSign(body)
    case 'Notification':
      return buildNotificationStringToSign(body)
    default:
      return
  }
}

function buildNotificationStringToSign(body) {
  let stringToSign = ''

  stringToSign = "Message\n"
  stringToSign += body.Message + "\n"
  stringToSign += "MessageId\n"
  stringToSign += body.MessageId + "\n"
  if (body.Subject) {
      stringToSign += "Subject\n"
      stringToSign += body.Subject + "\n"
  }
  stringToSign += "Timestamp\n"
  stringToSign += body.Timestamp + "\n"
  stringToSign += "TopicArn\n"
  stringToSign += body.TopicArn + "\n"
  stringToSign += "Type\n"
  stringToSign += body.Type + "\n"

  return stringToSign
}

function buildSubscriptionStringToSign(body) {
  let stringToSign = ''

  stringToSign = "Message\n";
  stringToSign += body.Message + "\n";
  stringToSign += "MessageId\n";
  stringToSign += body.MessageId + "\n";
  stringToSign += "SubscribeURL\n";
  stringToSign += body.SubscribeURL + "\n";
  stringToSign += "Timestamp\n";
  stringToSign += body.Timestamp + "\n";
  stringToSign += "Token\n";
  stringToSign += body.Token + "\n";
  stringToSign += "TopicArn\n";
  stringToSign += body.TopicArn + "\n";
  stringToSign += "Type\n";
  stringToSign += body.Type + "\n";

  return stringToSign;
}


module.exports = { isValidSignature }