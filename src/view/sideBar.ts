import { window,
   commands, 
   ExtensionContext, 
   workspace, 
   Position,
   Range, 
  } from 'vscode';

import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';
import { getSnippetFor } from '../services/snippets';
import { writeFileWith } from '../core/core';

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
      this.openTextDocumentWith(jsSnippet);
      this.updateSnippet();
    });
  }

  private async openTextDocumentWith(snippet: string) {
    return workspace.openTextDocument({ language: 'javascript' }).then(doc => {
      window.showTextDocument(doc).then(() => this.print(snippet));
    });
  }

  private print(snippet: string) {
    const editor = window.activeTextEditor;

    editor!.edit(builder => {
      const start = new Position(0, 0);
      builder.insert(start, snippet);
    });
  }

  private updateSnippet() {
    const editor = window.activeTextEditor;
    const document = editor!.document;

    const start = new Position(0, 0);
    const end = new Position(document.lineCount, document.eol);
    const range = new Range(start, end);

    const snippet = document.getText(range);
    console.log('Updating snippet');
    writeFileWith(snippet);
  }
}
