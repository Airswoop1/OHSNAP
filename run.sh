#!/bin/bash
#Startup script for ohsnap

SC_DIR=/home/ec2-user/SC
LOG_DIR=/home/ec2-user/logs

sudo NODE_ENV=dev nohup forever start $SC_DIR/server.js > $LOG_DIR/log.out &

echo 'Initialization of easyfoodstamps complete'
