import 'mocha'
import { mock, instance, verify } from 'ts-mockito'
import { EventNotifierSNSMessage } from 'street-manager-data'
import NotificationS3Service from '../../../src/services/notificationS3Service'
import S3Service from '../../../src/services/aws/s3Service'
import { generateEventNotifierSNSMessage } from '../../fixtures/messageFixtures'
import * as moment from 'moment-timezone'

describe('NotificationS3Service', () => {

  let service: NotificationS3Service
  let s3Service: S3Service

  const NOTIFICATIONS_BUCKET = 'some-bucket'
  const NOTIFICATIONS_KEY = 'some-key/'

  before(() => {
    s3Service = mock(S3Service)

    service = new NotificationS3Service(
      NOTIFICATIONS_BUCKET,
      NOTIFICATIONS_KEY,
      instance(s3Service)
    )
  })

  describe('upload', () => {
    let notification: EventNotifierSNSMessage

    before(() => {
      notification = generateEventNotifierSNSMessage()
    })

    it('should upload the json notification to the Notifications bucket with the generated S3 key', async () => {
      const expectedKey = `some-key/permit_some-ref-01_work_start_event_${moment.tz(notification.event_time, 'Europe/London').format('YYYY-MM-DD_HH-mm-ss-ms')}.json`

      await service.upload(notification)

      verify(s3Service.upload(NOTIFICATIONS_BUCKET, expectedKey, JSON.stringify(notification))).called()
    })
  })
})
