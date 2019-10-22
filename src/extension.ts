import * as vscode from 'vscode';
import Sidebar from './view/Sidebar';

export async function activate(context: vscode.ExtensionContext) {
  // tslint:disable-next-line: no-unused-expression
  new Sidebar(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
