output "vpc_id" {
  description = "The VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs used by the application load balancer"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "Private subnet IDs for application and database workloads"
  value       = module.vpc.private_subnet_ids
}

output "app_security_group_id" {
  description = "Security group applied to the Flask container application"
  value       = module.vpc.app_security_group_id
}

output "alb_security_group_id" {
  description = "Security group applied to the application load balancer"
  value       = module.vpc.alb_security_group_id
}
