import { injectable, inject } from 'inversify'
import { S3 } from 'aws-sdk'
import TYPES from '../../types'
import AWSService from './awsService'

@injectable()
export default class S3Service extends AWSService<S3> {

  public constructor(@inject(TYPES.S3) private s3: S3) {
    super(s3)
  }

  public async upload(bucket: string, key: string, body: string): Promise<void> {
    const params: S3.PutObjectRequest = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: 'application/json'
    }

    try {
      await super.toAWSPromise<S3.PutObjectRequest, S3.PutObjectOutput>(this.s3.putObject, params)
    } catch (error) {
      console.log(error)
    }
  }
}
