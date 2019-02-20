#!/usr/bin/env bash
cd $(dirname "$0")

vagrant ssh -- "cd /app && npm run build:no-check"
