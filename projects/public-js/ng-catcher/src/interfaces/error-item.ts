import { NgCatcherConfig } from './ng-catcher-config';


export interface IErrorItem {
    type: string;
    module: string | null;
    project: Required<NgCatcherConfig>['project'];
    version: Required<NgCatcherConfig>['version'];
    sessionId: Required<NgCatcherConfig>['sessionId'];
    params: Required<NgCatcherConfig>['params'];
}
