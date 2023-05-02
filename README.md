# Presigned PUT S3 URL

## Cors configuration

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## Configure AWS Permissions

- Create an S3 Bucket <your_bucket>
- Create an IAM User
- Create a Customer Managed Policy called `S3FineGrainedAccess`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "sid12332",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:GetBucketTagging",
        "s3:GetBucketCORS",
        "s3:ListBucket",
        "s3:PutBucketCORS",
        "s3:DeleteObject",
        "s3:GetBucketPolicy"
      ],
      "Resource": ["arn:aws:s3:::<your_bucket>/*", "arn:aws:s3:::<your_bucket>"]
    },
    {
      "Sid": "sid23434",
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*"
    }
  ]
}
```

