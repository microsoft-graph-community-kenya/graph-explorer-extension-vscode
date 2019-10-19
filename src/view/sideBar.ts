import { TreeView, ExtensionContext, window, commands, Uri } from 'vscode';
import * as vscode from 'vscode';
import SampleQueryProvider from './SamplesProvider';

export default class SideBar {
  private sampleQueries: any;
  constructor(context: ExtensionContext) {
    const samples = [
      {
        'Getting Started': ['my mail', 'items trending around me', 'all items in my drive']
      }
    ];

    const samplesProvider = new SampleQueryProvider(samples as any);
  }
}
