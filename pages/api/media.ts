// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'crypto';
import s3 from '@/aws/s3/s3';

type Data = {
  s3UploadUrl: string;
  key: string;
}

/**
 * This function generates a signed URL for uploading media to an S3 bucket and returns the URL and
 * key.
 * @param {NextApiRequest} req - The NextApiRequest object represents the incoming HTTP request in a
 * Next.js API route. It contains information about the request such as the HTTP method, headers, query
 * parameters, and body.
 * @param res - `res` is the response object that will be sent back to the client making the request.
 * It is of type `NextApiResponse<Data>`, where `Data` is the type of data that will be returned in the
 * response. In this case, the response will be a JSON object containing a signed
 */

export default async function uploadMedia(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //? image/jpg => ["image","jpg"] => "jpg"
  const ext = (req.query.fileType as string).split("/")[1];
  const Key = `${randomUUID()}.${ext}`;
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Expires: 10,
    ContentType: `image/${ext}`
  }
  const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);

  res.status(200).json({ s3UploadUrl, key: Key });
}
