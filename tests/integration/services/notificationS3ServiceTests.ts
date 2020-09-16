import 'mocha'
import { assert } from 'chai'
import { getFileFromS3, deleteFileFromS3 } from '../helpers/s3Helper'

describe('NotificationS3Service Tests', () => {
  let key: string

  before(() => {
    key = 'notifications-integration-test/permit_QRS1590571966998-01_work_start_event_2020-06-02_09-48-00-480.json'
  })

  describe('upload', () => {
    it('should upload json notification to s3', async () => {
      const s3File: string = await getFileFromS3(key)

      await deleteFileFromS3(key)

      assert.isTrue(s3File.includes('QRS1590571966998-01'))
    })
  })
})
