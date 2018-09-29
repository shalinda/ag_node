import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { EmpType } from '../model/empType';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmpTypeService {

  private url = 'http://gitlabtorq:5000/api/v1/empTypes';  // URL to web api

  constructor(private http: HttpClient) { }

    getEmpTypes(): Observable<EmpType[]> {      
      return this.http.get<EmpType[]>(this.url)
    }
}
