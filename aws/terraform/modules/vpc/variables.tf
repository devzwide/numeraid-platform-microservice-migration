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
  default     = "10.0.0.0/24"
  description = "CIDR Block for the VPC"
  type        = string
  nullable    = false
}
