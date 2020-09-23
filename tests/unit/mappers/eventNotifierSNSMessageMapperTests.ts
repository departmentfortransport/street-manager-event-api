import 'mocha'
import { assert } from 'chai'
import { EventNotifierSNSMessage } from 'street-manager-data'
import { generateEventNotifierSNSMessage } from '../../fixtures/messageFixtures'
import EventNotifierSNSMessageMapper from '../../../src/mappers/eventNotifierSNSMessageMapper'

describe('eventNotifierSNSMessageMapper', () => {
  let snsMessage: EventNotifierSNSMessage

  let eventNotifierSNSMessageMapper: EventNotifierSNSMessageMapper

  beforeEach(() => {
    eventNotifierSNSMessageMapper = new EventNotifierSNSMessageMapper()
    snsMessage = generateEventNotifierSNSMessage()
  })

  describe('mapToSNSMessage', () => {
    it('should map a JSON string to EventNotifierSNSMessage object with relevant types', () => {
      const result: EventNotifierSNSMessage = eventNotifierSNSMessageMapper.mapToSNSMessage(JSON.stringify(snsMessage))

      assert.equal(typeof result.event_reference, 'number')
      assert.equal(typeof result.event_type, 'string')
      assert.equal(typeof result.object_data, 'object')
      assert.equal(typeof result.event_time, 'object')
      assert.equal(typeof result.object_type, 'string')
      assert.equal(typeof result.object_reference, 'string')
      assert.equal(typeof result.version, 'number')

      assert.deepEqual(result, snsMessage)
    })
  })
})
