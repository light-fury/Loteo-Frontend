#!/usr/bin/env bash
cd $(dirname "$0")

#COLOR='\e[0;32m'
#NC='\e[0m' # No Color

#printf 'Do you want to start '${COLOR}'nginx'${NC}'? [y/N]: '
#read -r use_nginx
export USE_NGINX=1

VAGRANT_RUNNING=`vagrant status | grep "running"`

if [ -z "$VAGRANT_RUNNING" ]
then
vagrant up
else
vagrant reload
fi
