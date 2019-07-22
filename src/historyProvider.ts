import * as vscode from 'vscode';

//todo finish implementation
export default class HistoryProvider
  implements vscode.TreeDataProvider<TreeQuery> {
  constructor(private context: vscode.ExtensionContext) {}

  getChildren(query?: TreeQuery): TreeQuery[] {
    const sampleQueries: TreeQuery[] = [];

    return sampleQueries;
  }

  getTreeItem(query: TreeQuery): vscode.TreeItem {
    return query;
  }
}

// todo extract this to a separate file.
class TreeQuery extends vscode.TreeItem {
  type: string;

  constructor(
    type: string,
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    iconPath: string,
    command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.type = type;
    this.command = command;

    this.iconPath = iconPath;
  }
}
