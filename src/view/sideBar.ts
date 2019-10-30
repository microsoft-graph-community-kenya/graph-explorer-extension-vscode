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
    commands.registerCommand('snippet.run', () => this.updateSnippet());
    commands.registerCommand('sample.click', async (sample) => { 
      const jsSnippet = await getSnippetFor('javascript', sample);
      this.openTextDocumentWith(jsSnippet);
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
    writeFileWith(snippet);
    this.run();
  }

  private run() {
    const { exec } = require('child_process');
    const path = require('path');

    const runnableSnippet = path.join(__dirname, '../../src/files/snippet.js');
    
    exec(`node ${runnableSnippet}`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`${stdout}`);
      console.error(`${stderr}`);

      const outputChannel = window.createOutputChannel('Snippet Results');
      outputChannel.show();

      if (stdout) {      
        outputChannel.append(stdout);
      } else if (stderr) {
        outputChannel.append(stderr);
      }
    });
  }
}
