output "erc_urls" {
  value = aws_ecr_repository.this[*].repository_url
}

output "jenkins_role_arn" {
  value = aws_iam_role.jenkins_ecr_role.arn
}