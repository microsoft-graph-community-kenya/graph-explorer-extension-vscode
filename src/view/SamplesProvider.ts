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

  getChildren(category: any): ProviderResult<any[]> {
    const categories = Object.keys(this.samplesGroupedByCategory);

    if (category) {
      const children = this.samplesGroupedByCategory[category.label];
      return children.map((child: any) => {
        return new Sample(child.humanName, 
          TreeItemCollapsibleState.None,
          child.method,
          child.requestUrl,
          child.docLink,
          child.headers,
          child.body,
          child.tip);
      });
    }

    return categories.map((category) => {
      return new TreeItem(category, TreeItemCollapsibleState.Collapsed);
    });
  }
}
