const fs = require('fs');
const path = require('path');

const runnableSnippet = path.join(__dirname, '../../src/files/snippet.js');

export function writeFileWith(snippet: string) {
  const snippetByteArray = new Uint8Array(Buffer.from(createRunnable(snippet)));

  writeFile(runnableSnippet, snippetByteArray);
}

function writeFile(path: string, data: Uint8Array) {
  fs.writeFile(path, data, (err: any) => {
    if (err) { throw err; }
    console.log("File saved successfully");
  });
}

function createRunnable(snippet: string): string {
  return `
require("isomorphic-fetch");
const { Client } = require("@microsoft/microsoft-graph-client");

class AuthProvider {
	getAccessToken() {
    return Promise.resolve('Enter token here');
	}
}

const authProvider = new AuthProvider();
Client.init = Client.initWithMiddleware;

async function runSnippet() {
  try {
    ${snippet}
  } catch (error) {
    throw error;
  }
}

runSnippet();

module.exports = { runSnippet }
`;
}

