import { TreeView, ExtensionContext, window, commands, Uri } from 'vscode';
import * as vscode from 'vscode';
import SampleQueryProvider from './sampleQueryProvider';
import HistoryProvider from './historyProvider';
// todo fetch sample response 
const queriesResponse: any = {
  'my profile': {
    '@odata.context':
      'https://graph.microsoft.com/v1.0/$metadatausers/$entity\n',
    businessPhones: ['+1 412 555 0109'],
    displayName: 'Megan Bowen\n',
    givenName: 'Megan',
    jobTitle: 'Auditor',
    mail: 'MeganB@M365x214355.onmicrosoft.com',
    mobilePhone: null,
    officeLocation: '12/1110',
    preferredLanguage: 'en-US',
    surname: 'Bowen',
    userPrincipalName: 'MeganB@M365x214355.onmicrosoft.com',
    id: '48d31887-5fad-4d73-a9f5-3c356e68a038'
  }
};

export default class SideBar {
  private historyQueries: any;
  private sampleQueries: any;
  constructor(context: ExtensionContext) {
    const sampleQueriesProvider = new SampleQueryProvider(context);
    const historyProvider = new HistoryProvider(context);

    this.sampleQueries = window.registerTreeDataProvider(
      'sample-queries',
      sampleQueriesProvider
	);
	
    this.historyQueries = window.registerTreeDataProvider(
      'history',
      historyProvider
    );

    // register a content provider for the cowsay-scheme
    const myScheme = 'response';
    const myProvider = new (class
      implements vscode.TextDocumentContentProvider {
      // emitter and its event
      onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
      onDidChange = this.onDidChangeEmitter.event;

      provideTextDocumentContent(uri: vscode.Uri): string {
        return uri.query;
      }
    })();
    vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider);

    commands.registerCommand('sampleQuery.Click', async query => {
      let uri = vscode.Uri.parse(
        'response:' +
          `response.json?` +
          JSON.stringify({
            'my profile': {
              '@odata.context':
                'https://graph.microsoft.com/v1.0/$metadatausers/$entity\n',
              businessPhones: ['+1 412 555 0109'],
              displayName: 'Megan Bowen\n',
              givenName: 'Megan',
              jobTitle: 'Auditor',
              mail: 'MeganB@M365x214355.onmicrosoft.com',
              mobilePhone: null,
              officeLocation: '12/1110',
              preferredLanguage: 'en-US',
              surname: 'Bowen',
              userPrincipalName: 'MeganB@M365x214355.onmicrosoft.com',
              id: '48d31887-5fad-4d73-a9f5-3c356e68a038'
            }
            // add new lines and tabs
          }).replace(/,/g, ',\n\t')
      );
      let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider

      await vscode.window.showTextDocument(doc, {});
      if (!vscode.window.activeTextEditor) {
        return;
      }

      let { document, edit } = vscode.window.activeTextEditor;

      // formats the response
      edit(builder => {
        const start = new vscode.Position(0, 0);

        const end = new vscode.Position(document.lineCount, document.eol);
        const allRange = new vscode.Range(start, end);
        builder.replace(allRange, document.getText());
      });
    });
  }
}
