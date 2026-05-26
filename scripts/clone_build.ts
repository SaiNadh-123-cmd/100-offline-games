import simpleGit from 'simple-git';
import { exec } from 'child_process';
import * as path from 'path';

export async function cloneRepository(repoUrl: string, destDir: string, onProgress: (msg: string) => void): Promise<boolean> {
  const git = simpleGit();
  try {
    onProgress(`Cloning ${repoUrl} into ${destDir}...`);
    await git.clone(repoUrl, destDir);
    onProgress(`Clone successful.`);
    return true;
  } catch (error: any) {
    onProgress(`Error cloning repository: ${error.message}`);
    return false;
  }
}

export async function buildGame(buildCmd: string, cwd: string, onOutput: (msg: string) => void): Promise<boolean> {
  return new Promise((resolve) => {
    onOutput(`Starting build: ${buildCmd} in ${cwd}`);
    const child = exec(buildCmd, { cwd });

    child.stdout?.on('data', (data) => {
      onOutput(`STDOUT: ${data.toString()}`);
    });

    child.stderr?.on('data', (data) => {
      onOutput(`STDERR: ${data.toString()}`);
    });

    child.on('close', (code) => {
      onOutput(`Build process exited with code ${code}`);
      resolve(code === 0);
    });
  });
}
