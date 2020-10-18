# SEPT Startup code and  project Structure documentation 

# Quick Start

## Build, Deploy and Run
Build
* After packaging the back-end using maven, running the docker-compose file in the root of the directory will create all three images (including mysql) and start them as containers (can test via localhost:3000).

Deploy
* To deploy the application, we need to upload tagged versions of our images created in the previous step to aws ecr.
* Once uploaded, we need to use Terraform to create the infrastructure inside of aws ecs. First obviously though we need to be logged into awscli. Once done this, inside /deployment we need to run:
  * terraform init
  * terraform plan
  * terraform apply --auto-approve
  
Run
* If all has gone to plan, we should see our instances running inside the aws console under ec2.
* Unfortunately, we could not however get the port forwarding and proper addressing to work so accessing the app via the load balancer dns is not possible, sadly.
* I tried my hardest, I could practically taste the finish :(
