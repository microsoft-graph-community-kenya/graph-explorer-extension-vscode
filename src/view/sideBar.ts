import { window,
   commands, 
   ExtensionContext, 
   workspace, 
   Position, 
  } from 'vscode';

import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';
import { getSnippetFor } from '../services/snippets';

const fs = require('fs');
const path = require('path');

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
      this.writeFileWith(jsSnippet);
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

  private writeFileWith(snippet: string) {
    const snippetFile = path.join(__dirname, '../../src/files/snippet.js');
    console.log(snippetFile);

    const data = new Uint8Array(Buffer.from(this.createSnippet(snippet)));
    fs.writeFile(snippetFile, data, (err: any) => {
      if (err) { throw err; }
      console.log('The file has been saved!');
    });
  }
  
  private createSnippet(snippet: string): string {
    return `
import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthProvider } from "./auth-provider";

const authProvider = new AuthProvider();
Client.init = Client.initWithMiddleware;
      
${snippet}`;
  }
}
