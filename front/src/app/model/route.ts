import { Factory } from './factory';

export class Route {
    _id: string;
    route: string;
    name: string;
    trRate: string;
    routeRate: string;
    facNo: Factory = new Factory;
    cf: string;
}