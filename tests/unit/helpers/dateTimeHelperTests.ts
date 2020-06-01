import 'mocha'
import { calcuateTimeDifferenceInMilliseconds } from '../../../src/helpers/dateTimeHelper'
import { assert } from 'chai'

describe('dateTimeHelper', () => {

  describe('calcuateTimeDifferenceInMilliseconds', () => {
    it('should return the time difference in milliseconds', async () => {
      const timeOfEvent: Date = new Date(1970, 1, 1, 5, 4, 3)
      const timeMessageReceived: Date = new Date(1970, 1, 1, 5, 5, 3)

      const result: number = calcuateTimeDifferenceInMilliseconds(timeOfEvent, timeMessageReceived)
      assert.equal(result, 60000)
    })
  })
})
