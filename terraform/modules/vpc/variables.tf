variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "numeraid"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS region for the deployment"
  type        = string
  default     = "af-south-1"
}

variable "vpc_cidr" {
  description = "Primary VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets used by the load balancer and internet gateway"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets used by app and database workloads"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "enable_nat_gateway" {
  description = "Whether to create a NAT gateway in each public subnet for private outbound traffic"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Common tags applied to all resources"
  type        = map(string)
  default = {
    ManagedBy = "Terraform"
  }
}
