variable "aws_region" {
  default     = "us-east-2"
}

variable "aws_access_key" {}

variable "aws_secret_key" {}

variable "aws_ami" {
  default = "ami-0b500ef59d8335eee"
}

variable "aws_instance_type" {
  default     = "t2.small"
}

variable "itype" {
   default =  "m4.large.elasticsearch"
 }

variable "key_name" {
  default = "tf"
}