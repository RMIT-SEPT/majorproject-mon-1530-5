# resource "aws_ecr_repository" "bookingapi" {
#     name  = "backend"
# }
# resource "aws_ecr_repository" "frontend" {
#     name  = "frontend"
# }
resource "aws_ecs_cluster" "ecs_cluster" {
    name  = "booking-app-cluster"
}

output "mysql_endpoint" {
    value = aws_db_instance.mysql.endpoint
}
resource "aws_launch_configuration" "launch_configuration" {
    name = "bookingapi_launch_configuration"
    # image_id = "ami-094d4d00fd7462815"
    image_id = "ami-0947d2ba12ee1ff75"
    user_data = "#!/bin/bash\necho ECS_CLUSTER=booking-app-cluster >> /etc/ecs/ecs.config"
    instance_type = "t2.micro"
    security_groups = [aws_security_group.frontend_sg.id, aws_security_group.frontend_sg.id]
}
resource "aws_autoscaling_group" "bookingapi_autoscaling_group" {
    name = "bookingapi-autoscaling-group"
    launch_configuration = aws_launch_configuration.launch_configuration.name
    min_size = 1
    max_size = 1
    vpc_zone_identifier = [aws_subnet.private_az1.id, aws_subnet.private_az2.id, aws_subnet.private_az3.id]
    target_group_arns = [aws_lb_target_group.target_group.arn]
}
resource "aws_ecs_service" "backend" {
  name            = "backend"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.backend_td.arn
  desired_count   = 1
}
resource "aws_ecs_service" "frontend" {
  name            = "frontend"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.frontend_td.arn
  desired_count   = 1
}