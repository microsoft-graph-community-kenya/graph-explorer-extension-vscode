import { TreeItem, TreeItemCollapsibleState, Command } from 'vscode';

export class SampleCategory extends  TreeItem {
  constructor(
    label: string,
    collapsibleState:  TreeItemCollapsibleState,
    iconPath: string,
    command?: Command
  ) {
    super(label, collapsibleState);
    this.command = command;

    this.iconPath = iconPath;
  }
}
