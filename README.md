# Git-PP Plugin for Obsidian

Git-PP is a minimal plugin for Obsidian that allows you to **push** and **pull** your Obsidian vault to/from a GitHub repository using shell scripts.

It adds two commands:
* `git pull` — pulls the latest changes from your GitHub repo.
* `git push` — pushes your local vault changes to GitHub.

You can trigger these commands via the command palette or bind them to hotkeys.

## Features

* Push and pull to a GitHub repository using shell scripts.
* Simple command palette integration (`Ctrl+P` → search `git`).
* Hotkey support for fast syncing.
* Useful for syncing private vaults.

## Setup Instructions

### 1. Set up your GitHub Repo

* Create a private/public repo on GitHub.
* On your system:

```bash
cd /path/to/your/Obsidian\ Vault
git init # if not already a git repo
git remote add origin https://ghp_<YOUR_TOKEN>@github.com/<your-username>/<repo-name>
```

Replace `<YOUR_TOKEN>` with a GitHub **fine-grained personal access token** (with repo access). This makes pushing/pulling easier for private repos.

### 2. Install the Plugin

In your Obsidian vault directory:

```bash
mkdir -p .obsidian/plugins/
cd .obsidian/plugins/
git clone https://github.com/blitzboah/git-pp.git
cd git-pp/
npm install
npm run dev
```

### 3. Enable in Obsidian

* Open **Obsidian**.
* Go to **Settings → Community plugins**.
* Enable **Community plugins** if not already done.
* Click **"Reload plugins"** or restart Obsidian.
* Toggle on `git-pp`.

## Using the Plugin

* Press `Ctrl+P` (or `Cmd+P` on macOS).
* Search for `git pull` or `git push`.
* You can assign custom hotkeys from **Settings → Hotkeys → git-pp**.

## Scripts Used

This plugin runs two shell scripts from your local file system:
* `git-puller.sh`: Pulls the vault.
* `git-pusher.sh`: Adds/commits/pushes changes.

Make sure these scripts are executable:

```bash
chmod +x git-puller.sh
chmod +x git-pusher.sh
```

And located inside your plugin folder:

```
.obsidian/plugins/git-pp/git-puller.sh
.obsidian/plugins/git-pp/git-pusher.sh
```

## Configuration

### Update Script Paths

You need to update the script paths in `main.ts` to match your system:

```typescript
import { Plugin } from "obsidian";
import { spawn } from "child_process";

export default class GitScriptPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "git-pull",
      name: "git pull",
      callback: () => {
        const pull = spawn("sh", ["/path/to/your/Obsidian Vault/.obsidian/plugins/git-pp/git-puller.sh"]);
        pull.stdout.on("data", data => console.log(`stdout (pull): ${data}`));
        pull.stderr.on("data", data => console.warn(`stderr (pull): ${data}`));
        pull.on("error", err => console.error(`Error (pull): ${err.message}`));
      }
    });

    this.addCommand({
      id: "git-push",
      name: "git push",
      callback: () => {
        const push = spawn("sh", ["/path/to/your/Obsidian Vault/.obsidian/plugins/git-pp/git-pusher.sh"]);
        push.stdout.on("data", data => console.log(`stdout (push): ${data}`));
        push.stderr.on("data", data => console.warn(`stderr (push): ${data}`));
        push.on("error", err => console.error(`Error (push): ${err.message}`));
      }
    });
  }
}
```

**Important**: Replace `/path/to/your/Obsidian Vault` with your actual vault path. For example:
- Linux: `/home/username/Documents/Obsidian Vault`
- macOS: `/Users/username/Documents/Obsidian Vault`

### Update Shell Scripts

You also need to configure the shell scripts with your vault path:

**git-puller.sh**:
```bash
#!/bin/bash
cd;
cd "/path/to/your/Obsidian Vault/[vault-wtih-git]"
git pull
```

**git-pusher.sh**:
```bash
#!/bin/bash
cd "/path/to/your/Obsidian Vault/[vault-with-git]"
if [ -n "$(git status --porcelain)" ]; then
  git add .
  git commit -m "pushed on $(date)"
fi
git push origin main
```

Replace `/path/to/your/Obsidian Vault/` with your actual vault directory path in both scripts.

## Dev Setup

To build or modify the plugin:

```bash
npm install
npm run dev
```

This watches your changes in `main.ts`.
