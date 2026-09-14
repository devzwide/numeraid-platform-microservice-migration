variable "aws_region" {
  default     = "af-south-1"
  description = "AWS Region where Resources will be deployed"
  type        = string
  nullable    = false
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "numeraid"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "tags" {
  default = {
    Project     = "numeraid"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
  description = "Tags to apply to all resources"
  type        = map(string)
}

variable "vpc_cidr" {
  default     = "10.0.0.0/16"
  description = "CIDR Block for the VPC"
  type        = string
  nullable    = false
}
