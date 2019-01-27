#!/bin/bash

sudo yum update

wget --header "Cookie: oraclelicense=accept-securebackup-cookie" \
    http://download.oracle.com/otn-pub/java/jdk/8u151-b12/e758a0de34e24606bca991d704f6dcbf/jdk-8u151-linux-x64.rpm

yum localinstall -y jdk-8u151-linux-x64.rpm

rpm -i https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.3.rpm

echo ES_JAVA_OPTS="\"-Xms1g -Xmx1g\"" >> /etc/sysconfig/elasticsearch
echo MAX_LOCKED_MEMORY=unlimited >> /etc/sysconfig/elasticsearch

echo -e "yes\n" | /usr/share/elasticsearch/bin/elasticsearch-plugin install discovery-ec2

echo "network.host: 0.0.0.0" >> /etc/elasticsearch/elasticsearch.yml

sudo chkconfig --add elasticsearch

sudo service elasticsearch start
