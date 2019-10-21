import { ISample } from "../types";
import { URL } from "url";

const request = require('request-promise');

export function getSnippetFor(language: string, sample: ISample) {
  const httpMsg = generateHttpMsgFrom(sample);
  return fetchSnippetFor(language)(httpMsg);
}

function generateHttpMsgFrom(sample: ISample): string {
  const urlObject: URL = new URL(`https://graph.microsoft.com${sample.requestUrl}`);
  sample.requestUrl = urlObject.pathname + urlObject.search;

  // tslint:disable-next-line: max-line-length
  return `${sample.method} ${sample.requestUrl} HTTP/1.1\r\nHost: graph.microsoft.com\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(sample.postBody)}`;
}

function fetchSnippetFor(language = 'csharp') {
  let uri = `https://graphexplorerapi.azurewebsites.net/api/graphexplorersnippets?lang=${language}`;

  return (httpMsg: string) => request({
    method: 'POST',
    uri,
    body: httpMsg
  });
}
