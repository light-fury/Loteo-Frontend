#!/usr/bin/env bash
moduleName=$1
componentName=$2
redux generate component ${moduleName} ${componentName}
git add src/${moduleName}/components/${componentName^}
