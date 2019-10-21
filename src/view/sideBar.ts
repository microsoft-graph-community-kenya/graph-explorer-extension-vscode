import { window,
   commands, 
   ExtensionContext, 
   workspace, 
   Position, 
   TextDocumentContentProvider, 
   EventEmitter, 
   Uri, 
   Range,
  } from 'vscode';

import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';
import { getSnippetFor } from '../services/snippets';

export default class Sidebar {
  context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.showSamplesTreeView();
    this.registerClickEvents();
  }

  private showSamplesTreeView() {
    const samplesProvider = new SampleQueryProvider(samples as any);
    window.registerTreeDataProvider('samples', samplesProvider);
  }

  private registerClickEvents() {
    commands.registerCommand('sample.click', async (sample) => { 
      const jsSnippet = await getSnippetFor('javascript', sample);
      await this.print(jsSnippet);
    });
  }

  private async print(snippet: string) {
    // register a content provider for the cowsay-scheme	
    const myScheme = 'response';
    const myProvider = new (class
      implements TextDocumentContentProvider {
      // emitter and its event	
      onDidChangeEmitter = new EventEmitter<Uri>();
      onDidChange = this.onDidChangeEmitter.event;

      provideTextDocumentContent(uri: Uri): string {
        return uri.query;
      }
    })();
    workspace.registerTextDocumentContentProvider(myScheme, myProvider);

    let uri = Uri.parse('response:' +
      `response.js?` + snippet.replace(/,/g, ',\n\t'));
    let doc = await workspace.openTextDocument(uri); // calls back into the provider	

    await window.showTextDocument(doc, {});
    if (!window.activeTextEditor) {
      return;
    }

    let { document, edit } = window.activeTextEditor;

    // formats the response	
    edit(builder => {
      const start = new Position(0, 0);

      const end = new Position(document.lineCount, document.eol);
      const allRange = new Range(start, end);
      builder.replace(allRange, document.getText());
    });
  }
}
