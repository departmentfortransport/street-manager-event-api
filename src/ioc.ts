import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from './types'
import Logger from './utils/logger'
import EventNotifierSNSMessageMapper from './mappers/eventNotifierSNSMessageMapper'
import EventNotifierSNSMessageService from './services/eventNotifierSNSMessageService'
import { NOTIFICATIONS_BUCKET, NOTIFICATIONS_KEY, TIMEOUT_S3 } from './config'
import NotificationS3Service from './services/notificationS3Service'
import { S3 } from 'aws-sdk'
import S3Service from './services/aws/s3Service'

const iocContainer = new Container()

// Utils
iocContainer.bind<Logger>(TYPES.Logger).to(Logger)

// Mappers
iocContainer.bind<EventNotifierSNSMessageMapper>(TYPES.EventNotifierSNSMessageMapper).to(EventNotifierSNSMessageMapper)

// Services
iocContainer.bind<EventNotifierSNSMessageService>(TYPES.EventNotifierSNSMessageService).to(EventNotifierSNSMessageService)
iocContainer.bind<NotificationS3Service>(TYPES.NotificationS3Service).to(NotificationS3Service)
iocContainer.bind<S3Service>(TYPES.S3Service).to(S3Service)

// S3
iocContainer.bind<S3>(TYPES.S3).toConstantValue(new S3({
  httpOptions: {
    connectTimeout: Number(TIMEOUT_S3),
    timeout: Number(TIMEOUT_S3)
  }
}))
iocContainer.bind<string>(TYPES.NOTIFICATIONS_BUCKET).toConstantValue(NOTIFICATIONS_BUCKET)
iocContainer.bind<string>(TYPES.NOTIFICATIONS_KEY).toConstantValue(NOTIFICATIONS_KEY)

export default iocContainer
