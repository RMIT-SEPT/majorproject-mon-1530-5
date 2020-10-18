resource "aws_ecs_task_definition" "backend_td" {
  family                = "backend_td"
  container_definitions = data.template_file.task_definition_template_backend.rendered
}
resource "aws_ecs_task_definition" "frontend_td" {
  family                = "frontend_td"
  container_definitions = data.template_file.task_definition_template_frontend.rendered
}
data "template_file" "task_definition_template_backend" {
    template = file("task_definition_backend.json.tpl")
    vars = {
      DATABASE_URL = aws_db_instance.mysql.endpoint
    }
}
data "template_file" "task_definition_template_frontend" {
    template = file("task_definition_frontend.json.tpl")
}