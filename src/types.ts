const TYPES = {
  // Utils
  Logger: Symbol.for('Logger'),
  // Mappers
  EventNotifierSNSMessageMapper: Symbol.for('EventNotifierSNSMessageMapper'),
  // Services
  EventNotifierSNSMessageService: Symbol.for('EventNotifierSNSMessageService'),
  NotificationS3Service: Symbol.for('NotificationS3Service'),
  S3Service: Symbol.for('S3Service'),
  // AWS
  S3: Symbol.for('S3'),
  NOTIFICATIONS_BUCKET: Symbol.for('NOTIFICATIONS_BUCKET'),
  NOTIFICATIONS_KEY: Symbol.for('NOTIFICATIONS_KEY'),
  INTEGRATION_TESTS_BUCKET: Symbol.for('INTEGRATION_TESTS_BUCKET')
}

export default TYPES
