import { TreeDataProvider, TreeItem, ProviderResult, TreeItemCollapsibleState } from 'vscode';

import { Sample } from './Sample';
import { ISample } from '../types';

export default class SamplesProvider implements TreeDataProvider<any> {

  private samplesGroupedByCategory: any;

  constructor(samples: ISample[]) {
    this.samplesGroupedByCategory = this.groupSamplesByCategory(samples);
  }

  private groupSamplesByCategory(samples: ISample[]): object[] {
    return samples.reduce((obj: any, sample) => {
      if (obj[sample.category]) {
        obj[sample.category].push(sample);
      } else {
        obj[sample.category] = [sample];
      }
      return obj;
    }, {});
  }

  onDidChangeTreeData?: import("vscode").Event<any> | undefined;

  getTreeItem(category: TreeItem): TreeItem {
    return category;
  }

  getChildren(sampleCategory: any): ProviderResult<any[]> {
    const categories = Object.keys(this.samplesGroupedByCategory);

    if (sampleCategory) {
      const samples = this.samplesGroupedByCategory[sampleCategory.label];
      return samples.map((sample: any) => {
        return new Sample(sample.humanName, 
          TreeItemCollapsibleState.None,
          sample.method,
          sample.requestUrl,
          sample.docLink,
          sample.headers,
          sample.body,
          sample.tip);
      });
    }

    return categories.map((category) => {
      return new TreeItem(category, TreeItemCollapsibleState.Collapsed);
    });
  }
}
