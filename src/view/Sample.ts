import { TreeItem, TreeItemCollapsibleState, Command } from 'vscode';

export class Sample extends  TreeItem {
  method: string;
  requestUrl: string;
  docLink: string;
  headers: string|undefined;
  body: string|undefined;
  tip: string|undefined;

  constructor(
    label: string,
    collapsibleState:  TreeItemCollapsibleState,
    method: string,
    requestUrl: string,
    docLink: string,
    headers?: string,
    body?: string,
    tip?: string,
    command?: Command

  ) {
    super(`${method}    ${label}`, collapsibleState);
    this.command = command;
    this.method = method;
    this.requestUrl = requestUrl;
    this.docLink = docLink;
    this.headers = headers;
    this.body = body;
    this.tip = tip;
  }

  get tooltip() {
    if (this.tip) {
      return this.tip;
    }
    return this.label;
  }
}
