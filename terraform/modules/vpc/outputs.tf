output "vpc_id" {
  description = "ID of the VPC created for the application"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "IDs of public subnets for the load balancer"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of private subnets for application and database tiers"
  value       = aws_subnet.private[*].id
}

output "app_security_group_id" {
  description = "Security group for the Flask application containers"
  value       = aws_security_group.app.id
}

output "alb_security_group_id" {
  description = "Security group for the public application load balancer"
  value       = aws_security_group.alb.id
}

output "db_subnet_group_name" {
  description = "Subnet group name for future RDS/PostgreSQL resources"
  value       = aws_db_subnet_group.private.name
}
