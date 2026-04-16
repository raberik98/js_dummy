resource "aws_ecr_repository" "this" {
  count = length(var.repositories)

  name                 = var.repositories[count.index]
  image_tag_mutability = "MUTABLE"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = var.repositories[count.index]
  }
}

resource "aws_iam_role" "jenkins_ecr_role" {
  name = "JenkinsECRFullAccessRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com" 
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "jenkins_ecr_policy" {
  name        = "JenkinsECRFullAccessPolicy"
  description = "Grants full access to a specific Amazon ECR repository for Jenkins"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken"
        ]
        Resource = aws_ecr_repository.this[*].arn
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetRepositoryPolicy",
          "ecr:DescribeRepositories",
          "ecr:ListImages",
          "ecr:DescribeImages",
          "ecr:BatchGetImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:PutImage",
          "ecr:SetRepositoryPolicy",
          "ecr:DeleteRepositoryPolicy",
          "ecr:DeleteRepository",
          "ecr:CreateRepository"
        ]
        Resource = aws_ecr_repository.this[*].arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "jenkins_ecr_policy_attachment" {
  role       = aws_iam_role.jenkins_ecr_role.name
  policy_arn = aws_iam_policy.jenkins_ecr_policy.arn
}





resource "aws_iam_user" "jenkins_user" {
  name = "jenkins-user"
}

resource "aws_iam_group" "jenkins_group" {
  name = "jenkins-group"
}

resource "aws_iam_policy" "assume_jenkins_ecr_role_policy" {
  name        = "AssumeJenkinsEcrRolePolicy"
  description = "Allows assuming only the jenkins_ecr_role"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = "sts:AssumeRole",
        Resource = aws_iam_role.jenkins_ecr_role.arn
      }
    ]
  })
}

resource "aws_iam_group_policy_attachment" "jenkins_group_policy_attach" {
  group      = aws_iam_group.jenkins_group.name
  policy_arn = aws_iam_policy.assume_jenkins_ecr_role_policy.arn
}

resource "aws_iam_user_group_membership" "jenkins_user_group_membership" {
  user = aws_iam_user.jenkins_user.name
  groups = [
    aws_iam_group.jenkins_group.name
  ]
}