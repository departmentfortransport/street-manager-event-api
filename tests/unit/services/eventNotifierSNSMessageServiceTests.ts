import 'mocha'
import { EventNotifierSNSMessage } from 'street-manager-data'
import { generateEventNotifierSNSMessage, generateSNSMessage } from '../../fixtures/messageFixtures'
import EventNotifierSNSMessageService, { EventLogMessage } from '../../../src/services/eventNotifierSNSMessageService'
import { mock, instance, verify, when, capture} from 'ts-mockito'
import Logger from '../../../src/utils/logger'
import EventNotifierSNSMessageMapper from '../../../src/mappers/eventNotifierSNSMessageMapper'
import { ArgCaptor1 } from 'ts-mockito/lib/capture/ArgCaptor'
import { assert } from 'chai'
import NotificationS3Service from '../../../src/services/notificationS3Service'

describe('EventNotifierSNSMessageService', () => {
  let eventNotifierSNSMessageMapper: EventNotifierSNSMessageMapper
  let logger: Logger
  let notificationS3Service: NotificationS3Service
  let eventNotifierSNSMessageService: EventNotifierSNSMessageService

  before(() => {
    eventNotifierSNSMessageMapper = mock(eventNotifierSNSMessageMapper)
    logger = mock(Logger)
    notificationS3Service = mock(notificationS3Service)

    eventNotifierSNSMessageService = new EventNotifierSNSMessageService(
      instance(logger),
      instance(eventNotifierSNSMessageMapper),
      instance(notificationS3Service)
    )
  })

  describe('handleMessage', () => {
    it('should call mapper and build a log object', async () => {
      const message: EventNotifierSNSMessage = generateEventNotifierSNSMessage()
      const messageJsonString: string = JSON.stringify(message)
      const receivedDate: Date = new Date()

      when(eventNotifierSNSMessageMapper.mapToSNSMessage(messageJsonString)).thenReturn(message)

      await eventNotifierSNSMessageService.handleMessage(generateSNSMessage(messageJsonString), receivedDate)

      const argCaptor: ArgCaptor1<EventLogMessage> = capture<EventLogMessage>(logger.log)
      const [logMessage] = argCaptor.first()

      assert.deepEqual(logMessage.notification_received, receivedDate)
      assert.equal(logMessage.event_reference, message.event_reference)
      assert.equal(logMessage.object_reference, message.object_reference)
      assert.isNumber(logMessage.time_to_notification)

      verify(eventNotifierSNSMessageMapper.mapToSNSMessage(messageJsonString)).called()
      verify(notificationS3Service.upload(message)).called()
    })
  })
})
