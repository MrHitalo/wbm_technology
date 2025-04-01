import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModbusService {
  private apiUrl = 'http://localhost:3000/api/modbus';
  private refreshInterval = 10000; 

  constructor(private http: HttpClient) { }

  autoRefreshData(): Observable<any> {
    return interval(this.refreshInterval).pipe(
      startWith(0), 
      switchMap(() => this.http.get(`${this.apiUrl}/data`))
    );
  }

}