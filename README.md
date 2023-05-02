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

- Replace <your_bucket> with the bucket you have previously created

- Create another Customer Managed Policy called `GenerateAccessKeyPolicy`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "sid0435890",
      "Effect": "Allow",
      "Action": [
        "iam:DeleteAccessKey",
        "iam:UpdateAccessKey",
        "iam:CreateAccessKey",
        "iam:ListAccessKeys"
      ],
      "Resource": "arn:aws:iam::<account_number>:user/<user_name>"
    }
  ]
}
```

- Replace <account_number> and <user_name> with Account Number and User Name of the created user
