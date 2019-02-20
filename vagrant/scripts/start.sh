#!/usr/bin/env bash
cd /app
nohup npm run dev -- --watch-poll >/dev/null 2>&1 &

if [ ${USE_NGINX} -eq 1 ]
then
# start nginx server
export $(cat /app/config/nginx/.env | xargs)
envsubst < /app/config/nginx/nginx.conf.template | sudo tee /etc/nginx/nginx.conf
sudo systemctl restart nginx.service
#
fi
