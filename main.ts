import { Plugin } from "obsidian";
import { exec } from "child_process";

export default class GitScriptPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "git-pull",
      name: "git pull",
      callback: () => {
        exec("sh /home/blitz/blitz/scripts/git-puller.sh", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error (pull): ${error.message}`);
            return;
          }
          if (stderr) {
            console.warn(`stderr (pull): ${stderr}`);
            return;
          }
          console.log(`stdout (pull): ${stdout}`);
        });
      }
    });

    this.addCommand({
      id: "git-push",
      name: "git push",
      callback: () => {
        exec("sh /home/blitz/blitz/scripts/git-pusher.sh", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error (push): ${error.message}`);
            return;
          }
          if (stderr) {
            console.warn(`stderr (push): ${stderr}`);
            return;
          }
          console.log(`stdout (push): ${stdout}`);
        });
      }
    });
  }
}


