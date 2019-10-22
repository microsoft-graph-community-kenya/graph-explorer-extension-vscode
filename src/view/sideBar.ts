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
  document: any;

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
      this.openTextDocument(jsSnippet);
    });
  }

  private async print(snippet: string) {
    const editor = window.activeTextEditor;
    const document = editor!.document;

    editor!.edit(builder => {
      const start = new Position(0, 0);

      const end = new Position(document!.lineCount, document!.eol);
      const allRange = new Range(start, end);
      builder.replace(allRange, snippet);
    });
  }

  private async openTextDocument(snippet: string) {
    return workspace.openTextDocument({ language: 'javascript' }).then(doc => {
      window.showTextDocument(doc).then(() => this.print(snippet));
    });
  }
}
