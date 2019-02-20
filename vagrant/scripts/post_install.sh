#!/usr/bin/env bash
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
npm i npm@latest -g

if [ ${USE_NGINX} -eq 1 ]
then
# install nginx server
apt-get install -y nginx
systemctl disable nginx.service
#
fi
