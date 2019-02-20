@echo off
SET /p USE_NGINX_INPUT=Do you want to start 'nginx'? [y/N]:
SET USE_NGINX=0
if "%USE_NGINX_INPUT%" == "y" set USE_NGINX=1

vagrant up
