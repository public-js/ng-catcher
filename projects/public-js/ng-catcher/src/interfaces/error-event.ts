import { IErrorItem } from './error-item';
import { GenericObject } from './generic-object';


export interface IErrorEvent extends IErrorItem {
    description: string | null;
    details: GenericObject | null;
    time: string;
}
