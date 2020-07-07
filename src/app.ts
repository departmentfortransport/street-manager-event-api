import TYPES from './types'
import iocContainer from './ioc'
import { SNSMessage, SNSHandler, SNSEvent } from 'aws-lambda'
import EventNotifierSNSMessageService from './services/eventNotifierSNSMessageService'

const eventNotifierSNSMessageService: EventNotifierSNSMessageService = iocContainer.get<EventNotifierSNSMessageService>(TYPES.EventNotifierSNSMessageService)

export const handler: SNSHandler = async (event: SNSEvent): Promise<void> => {
  const snsMessage: SNSMessage = event.Records[0].Sns

  return await eventNotifierSNSMessageService.handleMessage(snsMessage, new Date())
}
