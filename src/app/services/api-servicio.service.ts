import { Injectable } from '@angular/core';
import { HttpClient,HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { info } from 'src/interface';




@Injectable({
  providedIn: 'root'
})


export class ApiServicioService {

  private apiUrl= 'http://localhost:8080/tarjeta';
  
  constructor(private http: HttpClient){
   }

   public getMessage() : Observable<info[]>{
    return this.http.get<info[]>(this.apiUrl)
   }

   public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl +"?id="+id);
  }

  public edit(id: number, Info: info): Observable<any> {
    return this.http.put<any>(this.apiUrl, Info);
  }
  public add(Info: info): Observable<any> {
    return this.http.post<any>(this.apiUrl , Info);
  }
  public getById(id: number) : Observable<info>{
    return this.http.get<info>(this.apiUrl+"/"+id)
   }
}
