#!/bin/bash

# Update versions for stylesheets and scripts
echo "version: $(date +%s%3N)" > ./src/data/version.yaml

NODE_ENV=production ./build.sh &&

mkdir -p ../dist
rm -rf ../dist/*

mv dist/* ../dist/
rm -rf ./dist

echo "Succesfully copied files to deployment stage"