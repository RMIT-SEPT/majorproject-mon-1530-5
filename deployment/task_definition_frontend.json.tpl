[
    {
        "essential": true,
        "cpu": 2,
        "memory": 128,
        "name": "client",
        "image": "149859093103.dkr.ecr.us-east-1.amazonaws.com/frontend:latest",
        "environment": [
            {
                "name": "CHOKIDAR_USEPOLLING",
                "value": "true"
            }
        ],
        "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 3000
            }
        ]
    }
]