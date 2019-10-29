import { AuthenticationProvider } from "@microsoft/microsoft-graph-client";

export class AuthProvider implements AuthenticationProvider{
  getAccessToken(): Promise<string> {
    return Promise.resolve('token');
  }
}
