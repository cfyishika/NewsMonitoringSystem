import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  api_url="http://127.0.0.1:8000"
  constructor(private http: HttpClient) { }
  getcompanies():Observable<any>{
    return this.http.get(`${this.api_url}/api/company_list/`);
  }
}
