resource "aws_s3_bucket" "uploads" {
  bucket = var.bucket_name

  tags = {
    Name        = "Upload Bucket"
    Environment = "Dev"
    Project     = "DuanTYS"
  }
}

// terraform destroy -target=aws_s3_bucket.uploads

// terraform state list

// aws s3 ls