import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ServerAPIService {

  constructor(
    private http: HttpClient,
    private configAPI: ConfigService,
    ) { 
      this.httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

  httpOptions;
  response: ResponseInterface;

  getPageRequest(ob: String, op: String, rpp: Number, page: Number) : Observable<ResponseInterface>{
    return this.http.get<ResponseInterface>(`${this.configAPI.api}?ob=${ob}&op=${op}&rpp=${rpp}&page=${page}`);
  }

  getRequest(ob: String, op: String, id: Number) : Observable<ResponseInterface>{
    return this.http.get<ResponseInterface>(`${this.configAPI.api}?ob=${ob}&op=${op}&id=${id}`);
  }

  updateRequest(ob: String, op: String, item: any) : Observable<HttpEvent<ResponseInterface>>{
    this.httpOptions.params=item;
    return this.http.post<ResponseInterface>(`http://localhost:4200/json?ob=${ob}&op=${op}`, item, this.httpOptions);
  
}
}
