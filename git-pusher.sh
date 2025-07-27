#!/bin/bash
cd "/path/to/your/Obsidian Vault/[vault-with-git]"
if [ -n "$(git status --porcelain)" ]; then
  git add .
  git commit -m "pushed on $(date)"
fi
git push origin main
