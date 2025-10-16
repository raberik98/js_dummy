module "ecr" {
  source = "./modules/ecr"
  project_name = var.project_name
  repositories = [ 
    "${var.project_name}-auth",
    "${var.project_name}-store",
    "${var.project_name}-orders",
    "${var.project_name}-proxy"
  ]
}
