import TYPES from './types'
import iocContainer from './ioc'
import { SNSMessage, SNSHandler, SNSEvent } from 'aws-lambda'
import EventNotifierSNSMessageService from './services/eventNotifierSNSMessageService'

const eventNotifierSNSMessageService: EventNotifierSNSMessageService = iocContainer.get<EventNotifierSNSMessageService>(TYPES.EventNotifierSNSMessageService)

export const handler: SNSHandler = (event: SNSEvent): void => {
  const snsMessage: SNSMessage = event.Records[0].Sns

  return eventNotifierSNSMessageService.handleMessage(snsMessage, new Date())
}
