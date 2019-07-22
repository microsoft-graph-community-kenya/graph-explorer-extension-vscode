import { TreeView, ExtensionContext, window, commands } from 'vscode';
import SampleQueryProvider from './sampleQueryProvider';
import HistoryProvider from './historyProvider';
export default class SideBar {
  private historyQueries: any;
  private sampleQueries: any;
  constructor(context: ExtensionContext) {
    const sampleQueriesProvider = new SampleQueryProvider(context);
    const historyProvider = new HistoryProvider(context);
    //this.microsoftGraph = vscode.window.createTreeView('history', { treeDataProvider });
    this.sampleQueries = window.registerTreeDataProvider(
      'sample-queries',
      sampleQueriesProvider
    );
    this.historyQueries = window.registerTreeDataProvider(
      'history',
      historyProvider
    );

    commands.registerCommand('sampleQuery.Click', (...args) => {
      console.log(args);
    });
    commands.registerCommand('history', (...args) => {
      console.log(args);
    });
  }
}
