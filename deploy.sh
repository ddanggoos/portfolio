#!/bin/bash

# Portfolio Deployment Script for Raspberry Pi
# This script should be run on the Raspberry Pi

set -e

PROJECT_DIR="~/projects/portfolio"
CONTAINER_NAME="portfolio-app"
IMAGE_NAME="portfolio-app"

echo "🚀 Starting portfolio deployment..."

# Navigate to project directory
cd $PROJECT_DIR

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "🛑 Stopping existing container..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

echo "🔨 Building new Docker image..."
docker build -t $IMAGE_NAME .

echo "🐳 Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 80:80 \
  $IMAGE_NAME

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment completed successfully!"
echo "🌐 Your portfolio is now available at http://$(hostname -I | awk '{print $1}'):80"

# Show container status
echo "📊 Container status:"
docker ps | grep $CONTAINER_NAME
