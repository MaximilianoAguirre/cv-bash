data "aws_route53_zone" "main" {
  name         = "maximilianoaguirre.com."
  private_zone = false
}

resource "aws_route53_record" "webpage_cloudfront" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "bash.maximilianoaguirre.com"
  type    = "A"

  alias {
      name                   = aws_cloudfront_distribution.distribution.domain_name
      zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
      evaluate_target_health = true
  }
}
