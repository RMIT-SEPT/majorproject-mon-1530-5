resource "aws_lb" "load_balancer" {
    name = "bookingapi-load-balancer"
    internal = false
    load_balancer_type = "application"
    security_groups = [aws_security_group.frontend_sg.id, aws_security_group.backend_sg.id]
    subnets = [aws_subnet.public_az1.id, aws_subnet.public_az2.id, aws_subnet.public_az3.id]

    tags = {
        Environment = "production"
    }
}
resource "aws_lb_target_group" "target_group" {
    name = "bookingapi-target-group"
    port = 3000
    protocol = "HTTP"
    vpc_id = aws_vpc.vpc.id
}
resource "aws_lb_listener" "listener" {
    load_balancer_arn = aws_lb.load_balancer.arn
    port = "3000"
    protocol = "HTTP"

    default_action {
        type = "forward"
        target_group_arn = aws_lb_target_group.target_group.arn
    }
}
output "endpoint" {
    value = aws_lb.load_balancer.dns_name
}