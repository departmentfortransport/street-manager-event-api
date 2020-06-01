import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from './types'
import Logger from './utils/logger'
import EventNotifierSNSMessageMapper from './mappers/eventNotifierSNSMessageMapper'
import EventNotifierSNSMessageService from './services/eventNotifierSNSMessageService'

const iocContainer = new Container()

// Utils
iocContainer.bind<Logger>(TYPES.Logger).to(Logger)

// Mappers
iocContainer.bind<EventNotifierSNSMessageMapper>(TYPES.EventNotifierSNSMessageMapper).to(EventNotifierSNSMessageMapper)

// Services
iocContainer.bind<EventNotifierSNSMessageService>(TYPES.EventNotifierSNSMessageService).to(EventNotifierSNSMessageService)

export default iocContainer
