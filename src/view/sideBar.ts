import { window, commands } from 'vscode';

import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';
import { ISample } from '../types';

const request = require('request-promise');

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
    this.loadSnippet(httpMsg);
  }

  private generateHttpMsg(language: string, sample: ISample): string {
    if (sample.requestUrl) {
      // @ts-ignore
      const urlObject: URL = new URL(`https://graph.microsoft.com${sample.requestUrl}`);
      sample.requestUrl = urlObject.pathname + urlObject.search;
    }

    // tslint:disable-next-line: max-line-length
    const body = `${sample.method} ${sample.requestUrl} HTTP/1.1\r\nHost: graph.microsoft.com\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(sample.postBody)}`;
    return body;
  }

  private loadSnippet(httpMsg: string, language='csharp') {
    let uri = 'https://graphexplorerapi.azurewebsites.net/api/graphexplorersnippets';

    if (language !== 'csharp') {
      uri += `?lang=${language}`;
    }

    request({
      method: 'POST',
      uri,
      body: httpMsg
    }, function (error: any, response: any, body: any) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log(body); // Print the HTML for the Google homepage.
    });
  }
}
