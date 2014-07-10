#!/bin/bash
#Startup script for ohsnap

SC_DIR=/home/ec2-user/SC
LOG_DIR=/home/ec2-user/logs

nohup forever start $SC_DIR/server.js &

echo 'Initialization of easyfoodstamps complete'
