import { EmpType } from './empType';

export class Employee {
    _id: string;
    name: string;
    age: string;
    salary: string;
    empType: EmpType = new EmpType;
}