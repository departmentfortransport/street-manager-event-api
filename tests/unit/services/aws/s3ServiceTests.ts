import 'mocha'
import * as sinon from 'sinon'
import { assert } from 'chai'
import S3Service from '../../../../src/services/aws/s3Service'
import { S3 } from 'aws-sdk'

describe('S3Service', () => {

  let service: S3Service

  let s3: S3

  beforeEach(() => {
    s3 = new S3() // Stubbing individual methods using sinon due to S3 lib structure

    service = new S3Service(s3)
  })

  describe('upload', () => {
    const BUCKET = 'some-bucket'
    const KEY = 'some-key'

    let body: string

    let putObjectStub: sinon.SinonStub

    beforeEach(() => {
      body = ''

      putObjectStub = sinon.stub()
      s3.putObject = putObjectStub
    })

    it('should upload the provided stream to the S3 bucket with the provided key', async () => {
      putObjectStub.yields(null)

      await service.upload(BUCKET, KEY, body)

      const params: S3.PutObjectRequest = putObjectStub.getCall(0).args[0]

      assert.equal(params.Bucket, BUCKET)
      assert.equal(params.Key, KEY)
      assert.equal(params.Body, body)
    })
  })
})
