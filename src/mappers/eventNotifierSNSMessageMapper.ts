import 'reflect-metadata'
import { injectable } from 'inversify'
import { EventNotifierSNSMessage, ObjectTypeNotificationEnum, EventTypeNotificationEnum } from 'street-manager-data'

@injectable()
export default class EventNotifierSNSMessageMapper {
  public mapToSNSMessage(jsonMessage: string): EventNotifierSNSMessage {
    const message: EventNotifierSNSMessage = JSON.parse(jsonMessage)

    message.event_time = new Date(message.event_time)
    message.object_type = ObjectTypeNotificationEnum[message.object_type]
    message.event_type = EventTypeNotificationEnum[message.event_type]

    return message
  }
}
