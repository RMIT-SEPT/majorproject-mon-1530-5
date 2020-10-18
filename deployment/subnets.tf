resource "aws_subnet" "public_az1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.0.0/22"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "PUBLIC AZ1"
  }
}
resource "aws_subnet" "public_az2" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.4.0/22"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "PUBLIC AZ2"
  }
}
resource "aws_subnet" "public_az3" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.8.0/22"
  availability_zone       = "us-east-1c"
  map_public_ip_on_launch = true

  tags = {
    Name = "PUBLIC AZ3"
  }
}
resource "aws_subnet" "private_az1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.16.0/22"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "PRIVATE AZ1"
  }
}
resource "aws_subnet" "private_az2" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.20.0/22"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "PRIVATE AZ2"
  }
}
resource "aws_subnet" "private_az3" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.24.0/22"
  availability_zone       = "us-east-1c"
  map_public_ip_on_launch = true

  tags = {
    Name = "PRIVATE AZ3"
  }
}
# resource "aws_subnet" "data_az1" {
#   vpc_id                  = aws_vpc.main.id
#   cidr_block              = "10.0.32.0/22"
#   availability_zone       = "us-east-1a"
#   map_public_ip_on_launch = true

#   tags = {
#     Name = "DATA AZ1"
#   }
# }
# resource "aws_subnet" "data_az2" {
#   vpc_id                  = aws_vpc.main.id
#   cidr_block              = "10.0.36.0/22"
#   availability_zone       = "us-east-1b"
#   map_public_ip_on_launch = true

#   tags = {
#     Name = "DATA AZ2"
#   }
# }
# resource "aws_subnet" "data_az3" {
#   vpc_id                  = aws_vpc.main.id
#   cidr_block              = "10.0.40.0/22"
#   availability_zone       = "us-east-1c"
#   map_public_ip_on_launch = true

#   tags = {
#     Name = "DATA AZ3"
#   }
# }
