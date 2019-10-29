
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
  const options = {
	authProvider,
};

const client = Client.init(options);

let res = await client.api('/me/')
	.get();
}

runSnippet();
