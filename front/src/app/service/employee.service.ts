import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../model/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'api/v1/employees';  // URL to web api http://192.168.1.89:8000

  constructor(private http: HttpClient) { }

    addEmployee (employee: Employee): Observable<Employee> {      
      return this.http.post<Employee>(this.url, employee, httpOptions)      
    }

    updateEmployee (employee: Employee): Observable<Employee> {      
      return this.http.put<Employee>(this.url, employee, httpOptions)      
    }

    deleteEmployee(employee: Employee): Observable<Employee>  {
      // if (employee._id == null) return employee;
      const url = `${this.url}/${employee._id}`;  
      return this.http.delete<Employee>(url)      
    }

     /** GET hero by id. Will 404 if id not found */
    getEmployee(name: String): Observable<Employee> {
      const url = `${this.url}/${name}`;
      return this.http.get<Employee>(url)
    }

    getEmployees(): Observable<Employee[]> {      
      return this.http.get<Employee[]>(this.url)
    }
}
