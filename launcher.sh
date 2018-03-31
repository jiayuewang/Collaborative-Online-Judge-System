#!/bin/bash
fuser -k 3000/tcp
fuser -k 5000/tcp
fuser -k 5001/tcp
fuser -k 5002/tcp
fuser -k 5003/tcp

service redis_6379 restart

cd ./oj-client
npm install
ng build --watch &

cd ../oj-server
npm install
nodemon server.js &
# npm start &

cd ../executor
sudo pip install -r requirements.txt
python executor_server.py 5001 &
python executor_server.py 5002 &
python executor_server.py 5003 &


echo "================================================================"
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
fuser -k 5001/tcp
fuser -k 5002/tcp
fuser -k 5003/tcp
service redis_6379 stop