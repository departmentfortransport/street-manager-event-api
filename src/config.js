module.exports = {
  // S3
  NOTIFICATIONS_BUCKET: process.env.NOTIFICATIONS_BUCKET,
  NOTIFICATIONS_KEY: process.env.NOTIFICATIONS_KEY,
  TIMEOUT_S3: process.env.TIMEOUT_S3 || (5 * 1000)
}
