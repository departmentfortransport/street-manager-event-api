import 'mocha'
import iocContainer from '../../src/ioc'
import TYPES from '../../src/types'
import { S3 } from 'aws-sdk'

export const s3: S3 = iocContainer.get<S3>(TYPES.S3)
export const bucket: string = iocContainer.get<string>(TYPES.NOTIFICATIONS_BUCKET)
export const key = 'notifications-integration-test/'
