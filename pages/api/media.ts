// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'crypto';
import s3 from '@/aws/s3/s3';

type Data = {
  s3UploadUrl: string;
  key: string;
}

export default async function uploadMedia(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
