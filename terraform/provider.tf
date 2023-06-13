provider "aws" {
  region                  = "us-east-1"
  shared_credentials_file = "~/.aws/credentials"
  profile                 = "personal"

  default_tags {
    tags = {
      Project     = "cv-bash"
      Environment = "devuse1"
      Region      = "use1"
      State       = "Terraform managed"
    }
  }
}
