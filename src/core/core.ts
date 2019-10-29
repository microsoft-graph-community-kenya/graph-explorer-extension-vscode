const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const runnableSnippet = path.join(__dirname, '../../src/files/snippet.js');

export function writeFileWith(snippet: string) {
  const snippetByteArray = new Uint8Array(Buffer.from(createRunnable(snippet)));

  writeFile(runnableSnippet, snippetByteArray);
}

function writeFile(path: string, data: Uint8Array) {
  fs.writeFile(path, data, (err: any) => {
    if (err) { throw err; }
    console.log('file saved successfuly');
  });
}

function createRunnable(snippet: string): string {
  return `
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";

class AuthProvider {
	getAccessToken() {
    return Promise.resolve("Enter token here");
	}
}

const authProvider = new AuthProvider();
Client.init = Client.initWithMiddleware;

async function runSnippet() {
  ${snippet}
}

runSnippet();
`;
}

export function runSnippet() {
  exec(`node -r esm ${runnableSnippet}`, (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.log(err);
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
