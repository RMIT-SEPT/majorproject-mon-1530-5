resource "aws_db_subnet_group" "db_subnet_group" {
    subnet_ids  = [aws_subnet.public_az1.id, aws_subnet.public_az2.id, aws_subnet.public_az3.id]
}
resource "aws_db_instance" "mysql" {
    identifier                = "mysql"
    allocated_storage         = 5
    backup_retention_period   = 2
    multi_az                  = true
    engine                    = "mysql"
    engine_version            = "5.7"
    instance_class            = "db.t2.micro"
    name                      = "bookingapi_db"
    username                  = "root"
    password                  = "password"
    port                      = "3306"
    db_subnet_group_name      = aws_db_subnet_group.db_subnet_group.id
    vpc_security_group_ids    = [aws_security_group.backend_sg.id, aws_security_group.frontend_sg.id]
    skip_final_snapshot       = true
    final_snapshot_identifier = "backend-db-final"
    publicly_accessible       = true
}