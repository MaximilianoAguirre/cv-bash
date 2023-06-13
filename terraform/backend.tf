# Terraform block does not allow variables, so name and environment variables must be set manually here
terraform {
  backend "s3" {
    bucket         = "remote-cloud-terraform-state-bucket"
    dynamodb_table = "remote-cloud-terraform-state-locking"

    encrypt = "true"
    key     = "cv-bash.tfstate"
    region  = "us-east-1"
    profile = "personal"
  }
}
