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

variable "vpc_cidr" {
  description = "VPC CIDR Block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "tags" {
  description = "Common tags"
  type        = map(string)

  default = {
    ManagedBy = "Terraform"
  }
}
