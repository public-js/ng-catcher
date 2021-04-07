import { IErrorEvent } from './error-event';
import { IErrorItem } from './error-item';


export interface IErrorData {
    type: IErrorItem['type'];
    module: IErrorItem['module'];
    description: IErrorEvent['description'];
    details: IErrorEvent['details'];
}
