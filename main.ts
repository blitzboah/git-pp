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
