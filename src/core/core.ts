const fs = require('fs');
const path = require('path');

export function writeFileWith(snippet: string) {
  console.log('Writing file');
  const runnableSnippet = path.join(__dirname, '../../src/files/snippet.js');
  console.log(path);
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
import { AuthProvider } from "./auth-provider";

const authProvider = new AuthProvider();
Client.init = Client.initWithMiddleware;
      
${snippet}`;
}
