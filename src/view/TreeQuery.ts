import { TreeItem, TreeItemCollapsibleState, Command } from 'vscode';

export class TreeQuery extends  TreeItem {
  type: string;

  constructor(
    type: string,
    label: string,
    collapsibleState:  TreeItemCollapsibleState,
    iconPath: string,
    command?: Command
  ) {
    super(label, collapsibleState);
    this.type = type;
    this.command = command;

    this.iconPath = iconPath;
  }
}
