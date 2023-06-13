resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "maximiliano-aguirre-cv"

  lifecycle {
    ignore_changes = [ server_side_encryption_configuration ]
  }
}

resource "aws_s3_bucket_policy" "frontend_bucket" {
  bucket = aws_s3_bucket.frontend_bucket.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Principal": {
        "AWS": "${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"
      },
      "Action": "s3:GetObject",
      "Resource": "${aws_s3_bucket.frontend_bucket.arn}/*"
    }
  ]
}
POLICY
}
