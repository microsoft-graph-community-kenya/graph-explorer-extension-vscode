
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthProvider } from "./auth-provider";

const authProvider = new AuthProvider();
Client.init = Client.initWithMiddleware;
      
const options = {
	authProvider,
};

const client = Client.init(options);

let res = await client.api('/me/onenote/notebooks')
	.get();