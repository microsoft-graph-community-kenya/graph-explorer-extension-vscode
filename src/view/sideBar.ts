import { TreeDataProvider, window } from 'vscode';
import SampleQueryProvider from './SamplesProvider';
import { samples } from './samples/samples';

export default class Sidebar {
  constructor() {
    const samplesProvider = new SampleQueryProvider(samples as any);
    window.registerTreeDataProvider('samples', samplesProvider);
  }
}
