module "vpc" {
  source = "./modules/vpc"

  project_name = "numeraid"
  environment  = "dev"

  vpc_cidr = var.vpc_cidr
}
