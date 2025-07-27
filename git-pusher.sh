#!/bin/bash

cd "/home/blitz/Documents/Obsidian Vault/vault/"

if [ -n "$(git status --porcelain)" ]; then
  git add .
  git commit -m "pushed on $(date)"
fi

git push origin main
