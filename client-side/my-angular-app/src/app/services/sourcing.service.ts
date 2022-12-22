import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SourcingService {
  api_url="http://127.0.0.1:8000"

  constructor(private http: HttpClient) { }
  private _refreshNeeded=new Subject<void>();

  get refreshNeeded(){
    return this._refreshNeeded;
  } 

  getsource():Observable<any>{
    return this.http.get(`${this.api_url}/api/source_list/`);
  }

  deleteSource(id:number):Observable<any>{
    const url = `${this.api_url}/api/source_list/${id}`
    return this.http.delete(url)
  }
  updateSource(id:number,particularSource:any):Observable<any>{
    const url=`${this.api_url}/api/source_list/${id}`
    return this.http.put(url,particularSource)
  }
  addSource(source_data:any):Observable<any>{
    const url=`${this.api_url}/api/source_list/`;
    return this.http.post(url,source_data).pipe(
      tap(()=>{
        this._refreshNeeded.next();
        }) 
    )
    
  }
}
