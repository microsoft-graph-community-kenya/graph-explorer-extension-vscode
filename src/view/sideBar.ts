import { window, commands } from 'vscode';

import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';
import { ISample } from '../types';

export default class Sidebar {
  constructor() {
    this.showSamplesTreeView();
    this.registerClickEvents();
  }

  private showSamplesTreeView() {
    const samplesProvider = new SampleQueryProvider(samples as any);
    window.registerTreeDataProvider('samples', samplesProvider);
  }

  private registerClickEvents() {
    commands.registerCommand('sample.click', async (sample) => { 
      await this.getSnippet('csharp', sample);
    });
  }

  private getSnippet(language: string, sample: ISample) {
    const httpMsg = this.generateHttpMsg(language, sample);
    console.log(httpMsg);
  }

  private generateHttpMsg(language: string, sample: ISample): string {
    if (sample.requestUrl) {
      // @ts-ignore
      const urlObject: URL = new URL(`https://graph.microsoft.com${sample.requestUrl}`);
      sample.requestUrl = urlObject.pathname + urlObject.search;
    }

    let url = 'https://graphexplorerapi.azurewebsites.net/api/graphexplorersnippets';

    if (language !== 'csharp') {
      url += `?lang=${language}`;
    }

    // tslint:disable-next-line: max-line-length
    const body = `${sample.method} ${sample.requestUrl} HTTP/1.1\r\nHost: graph.microsoft.com\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(sample.postBody)}`;
    return body;
  }
}
