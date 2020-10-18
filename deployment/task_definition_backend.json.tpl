[
    {
        "essential": true,
        "cpu": 2,
        "memory": 128,
        "name": "bookingapi",
        "image": "149859093103.dkr.ecr.us-east-1.amazonaws.com/backend:latest",
        "environment": [
            {
                "name": "SPRING_DATASOURCE_URL",
                "value": "jdbc:mysql://${DATABASE_URL}/bookingapi_db?useLegacyDatetimeCode=false&serverTimezone=UTC"
            },
            {
                "name": "SPRING_DATASOURCE_DRIVER_CLASS_NAME",
                "value": "com.mysql.cj.jdbc.Driver"
            },
            {
                "name": "SPRING_DATASOURCE_USERNAME",
                "value": "root"
            },
            {
                "name": "SPRING_DATASOURCE_PASSWORD",
                "value": "password"
            }
        ],
        "portMappings": [
            {
                "containerPort": 8080,
                "hostPort": 8080
            }
        ]
    }
]