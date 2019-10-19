import * as vscode from 'vscode';

import { TreeQuery } from './TreeQuery';

const samples = [
  'my profile',
  'may photo',
  'my mail',
  'all the items in my drive'
];
export default class SampleQueryProvider
  implements vscode.TreeDataProvider<TreeQuery> {
  constructor(private context: vscode.ExtensionContext) {}

  getChildren(query?: TreeQuery): TreeQuery[] {
    const sampleQueries: TreeQuery[] = [];
    for (const item of samples) {
      sampleQueries.push(
        new TreeQuery(
          'GET',
          item,
          vscode.TreeItemCollapsibleState.None,
          '/Users/rey/Documents/Github/openS/graph-explorer/media/get.png',
          { 
            command: 'sampleQuery.Click', 
            title: "click", 
            arguments: [item]
       }
          
        )
      );
    }
    return sampleQueries;
  }

  getTreeItem(query: TreeQuery): vscode.TreeItem {
    return query;
  }
}
