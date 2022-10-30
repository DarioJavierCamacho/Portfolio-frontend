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

   getMessage() : Observable<info[]>{
    return this.http.get<info[]>(this.apiUrl)
   }
}
