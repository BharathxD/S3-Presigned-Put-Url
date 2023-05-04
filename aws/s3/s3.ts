import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY || "",
        secretAccessKey: process.env.SECRET_KEY || "",
    },
    signatureVersion: 'v4',
});

export default s3;