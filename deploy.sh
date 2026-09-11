#!/bin/bash

set -e

PROJECT_DIR="/var/www/html/demo"
DEPLOY_DIR="/var/www/html/production"

echo "Starting deployment..."

cd "$PROJECT_DIR"

echo "Installing dependencies..."
npm ci

echo "Building application..."
npm run build

echo "Deploying build..."

rm -rf "$DEPLOY_DIR"/*
cp -r dist/* "$DEPLOY_DIR"/

echo "Deployment completed successfully."

echo "Deployed files:"
ls -la "$DEPLOY_DIR"
