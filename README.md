# Elasticsearch cluster using Terraform on AWS(EC2) to the minimal

This module creates ES cluster on AWS

Pre-requisite

- Terraform
- AWS account
- Node

How to run

- Clone this repository, `https://github.com/collins-b/elasticsearch-aws-ec2.git`.

- `cd elasticsearch-aws-ec2`.

- Initialise Terraform, `terraform init`

- Run  `terraform apply` to provision ES in an AWS EC2 instance

- Change directory into `indexer`. Create a `.env` file with contents similar to `https://github.com/collins-b/elasticsearch-aws-ec2/indexer/.env.example`. Populate the variable value with the public IP address of the created EC2 Iinstance. You can get this by describing your instance or by directly viewing it on the AWS console.

     - Install required packages by running `npm install`. 

     - Index data in `sample.json` file, by running `node index.js`

     - Search can be done by running `node search_name.js`