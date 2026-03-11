#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

cd /home/ubuntu/FE

echo "Installing production dependencies..."
npm ci

echo "Reloading app with PM2..."
pm2 reload next-app --update-env || pm2 start npm --name next-app -- start

echo "Saving PM2 process list..."
pm2 save
