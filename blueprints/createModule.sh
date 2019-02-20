#!/usr/bin/env bash
moduleName=$1
redux generate module ${moduleName}
git add src/${moduleName}
