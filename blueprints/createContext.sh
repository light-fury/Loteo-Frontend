#!/usr/bin/env bash
moduleName=$1
contextName=$2
redux generate context ${moduleName} ${contextName}
git add src/${moduleName}/contexts/${contextName^}.tsx
