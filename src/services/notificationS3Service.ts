import { injectable, inject } from 'inversify'
import { EventNotifierSNSMessage } from 'street-manager-data'
import TYPES from '../types'
import S3Service from './aws/s3Service'
import * as moment from 'moment-timezone'

@injectable()
export default class NotificationS3Service {

  public constructor(
    @inject(TYPES.NOTIFICATIONS_BUCKET) private NOTIFICATIONS_BUCKET: string,
    @inject(TYPES.NOTIFICATIONS_KEY) private NOTIFICATIONS_KEY: string,
    @inject(TYPES.S3Service) private s3Service: S3Service) {}

  public async upload(notification: EventNotifierSNSMessage): Promise<void> {
    await this.s3Service.upload(this.NOTIFICATIONS_BUCKET, this.generateKeyPath(notification), JSON.stringify(notification))
  }

  private generateKeyPath(message: EventNotifierSNSMessage): string {
    const prefix = `${this.NOTIFICATIONS_KEY}${message.object_type.toLocaleLowerCase()}_${message.object_reference}_${message.event_type.toLocaleLowerCase()}`
    const timestamp: string = moment.tz(message.event_time, 'Europe/London').format('YYYY-MM-DD_HH-mm-ss-ms')
    return `${prefix}_event_${timestamp}.json`
  }
}
