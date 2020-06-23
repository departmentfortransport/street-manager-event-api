import { s3, bucket } from '../setup'
import { S3, AWSError } from 'aws-sdk'

export async function getFileFromS3(key: string): Promise<string> {
  const params: S3.GetObjectRequest = {
    Bucket: bucket,
    Key: key
  }

  return new Promise<string>((resolve, reject) =>
    s3.getObject(params, (err: AWSError, data: S3.GetObjectOutput) =>
      err ? reject(err) : resolve(<string>data.Body.toString())
    )
  )
}

export async function deleteFileFromS3(key: string): Promise<void> {
  const params: S3.DeleteObjectRequest = {
    Bucket: bucket,
    Key: key
  }

  return new Promise<void>((resolve, reject) =>
    s3.deleteObject(params, (err: AWSError) =>
      err ? reject(err) : resolve()
    )
  )
}
