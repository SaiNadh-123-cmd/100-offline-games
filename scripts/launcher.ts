import { execFile } from 'child_process';
import { BrowserWindow } from 'electron';
import * as path from 'path';

export function launchNativeGame(execPath: string, cwd: string, onOutput: (msg: string) => void) {
  onOutput(`Launching native game: ${execPath} in ${cwd}`);
  const child = execFile(execPath, { cwd }, (error) => {
    if (error) {
      onOutput(`Launch error: ${error.message}`);
    }
  });
  
  child.stdout?.on('data', data => onOutput(`STDOUT: ${data.toString()}`));
  child.stderr?.on('data', data => onOutput(`STDERR: ${data.toString()}`));
}

export function launchHtml5Game(indexPath: string) {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  
  win.loadFile(indexPath);
}
