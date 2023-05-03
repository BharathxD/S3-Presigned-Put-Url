// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import S3 from 'aws-sdk/clients/s3';
import { randomUUID } from 'crypto';

const s3 = new S3({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_KEY || "",
  },
  signatureVersion: 'v4',
});

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
    ContentType: `image/${ext}}`
  }
  const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);

  res.status(200).json({ s3UploadUrl, key: Key });
}
