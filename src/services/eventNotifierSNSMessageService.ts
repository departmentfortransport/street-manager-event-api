import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import TYPES from '../types'
import { EventNotifierSNSMessage } from 'street-manager-data'
import Logger from '../utils/logger'
import EventNotifierSNSMessageMapper from '../mappers/eventNotifierSNSMessageMapper'
import { SNSMessage } from 'aws-lambda'
import { calcuateTimeDifferenceInMilliseconds } from '../helpers/dateTimeHelper'

export interface EventLogMessage {
  notification_received: Date
  event_reference: number,
  object_reference: string,
  time_to_notification: number
}

@injectable()
export default class EventNotifierSNSMessageService {

  public constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.EventNotifierSNSMessageMapper) private mapper: EventNotifierSNSMessageMapper
  ) {}

  public handleMessage(snsMessage: SNSMessage, timeNotificationReceived: Date): void {
    const message: EventNotifierSNSMessage = this.mapper.mapToSNSMessage(snsMessage.Message)

    this.logger.log(this.generateLogMessage(message, timeNotificationReceived))
  }

  private generateLogMessage(message: EventNotifierSNSMessage, timeNotificationReceived: Date): EventLogMessage {
    return {
      notification_received: timeNotificationReceived,
      event_reference: message.event_reference,
      object_reference: message.object_reference,
      time_to_notification: calcuateTimeDifferenceInMilliseconds(message.event_time, timeNotificationReceived)
    }
  }
}
