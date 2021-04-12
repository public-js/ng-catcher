import { GenericObject } from './generic-object';


export interface NgCatcherConfig<Params = GenericObject | null> {
    serviceUrl: string;
    project: string;
    version: string;
    sessionId?: string;
    maxQueue?: number;
    maxTimeout?: number;
    retryMax?: number;
    retryTimeout?: number;
    params?: Params;
}
