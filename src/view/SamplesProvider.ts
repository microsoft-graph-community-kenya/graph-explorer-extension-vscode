import * as vscode from 'vscode';

import { TreeQuery } from './TreeQuery';
import { ISample } from '../types';

export default class SamplesProvider {
  private samples: ISample[];

  constructor(samples: ISample[]) {
    this.samples = samples;
  }

  private groupSamplesByCategory(samples: ISample[]): object[] {
    return samples.reduce((arr: any, sample) => {

    }, []);
  }
}
