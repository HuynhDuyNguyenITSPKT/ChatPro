resource "aws_s3_bucket" "uploads" {
  bucket = var.bucket_name

  tags = {
    Name        = "Upload Bucket"
    Environment = "Dev"
    Project     = "DuanTYS"
  }
}

resource "aws_s3_bucket_public_access_block" "uploads" {
  bucket = aws_s3_bucket.uploads.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.uploads.id

  depends_on = [
    aws_s3_bucket_public_access_block.uploads
  ]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicRead"
        Effect    = "Allow"
        Principal = "*"
        Action    = [
          "s3:GetObject"
        ]
        Resource = [
          "${aws_s3_bucket.uploads.arn}/*"
        ]
      }
    ]
  })
}

// aws s3 rm s3://duantys-upload-2026-001 --recursive

// terraform destroy -target=aws_s3_bucket.uploads

// terraform state list

// aws s3 ls