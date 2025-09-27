#!/bin/bash
set -e

echo "Pulling latest code..."
git pull

echo "Installing dependencies..."
npm install

echo "Building app..."
npm run build

echo "Starting app..."
npm run start
