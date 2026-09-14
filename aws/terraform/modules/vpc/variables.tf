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
  description = "CIDR Block for the VPC"
  type        = string
  nullable    = false
}
