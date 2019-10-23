import { window,
   commands, 
   ExtensionContext, 
   workspace, 
   Position, 
   ViewColumn,
  } from 'vscode';

import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';
import { getSnippetFor } from '../services/snippets';
import { ISample } from '../types';

const request = require('request-promise');

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
      await this.openTextDocumentWith(jsSnippet);
      this.showDocumentationFor(sample);
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

  private async showDocumentationFor(sample: ISample) {
    const panel = window.createWebviewPanel(
      'documentation',
      'Documentation',
      ViewColumn.Beside
      {}
    );

    panel.webview.html = await this.getWebviewContent(sample);
  }

  private async getWebviewContent(sample: ISample) {
    const html = await request({
      method: 'GET',
      uri: sample.docLink
    });

    return html;
}
