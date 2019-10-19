import * as vscode from 'vscode';
import SideBar from './view/sideBar';

export function activate(context: vscode.ExtensionContext) {
  // tslint:disable-next-line: no-unused-expression
  new SideBar(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
