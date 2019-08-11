import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private configAPI: ConfigService) { }

  user: UserInterface;

  login(login: String, pass: String): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(`${this.configAPI.api}?ob=user&op=login&user=${login}&pass=${pass}`);
  }

  setUser(user: UserInterface) {
      this.user = user;
  }

  logout() {
      this.user = null;
      this.http.get(`${this.configAPI.api}?ob=user&op=logout`, this.configAPI.header).subscribe();
  }

  getUser(){
      return this.user;
  }

  isAdmin(){
      return this.user && this.user.typeuser_obj.id===1;
  }

  isEmployee(){
    return this.user && this.user.typeuser_obj.id===2;
  }

}
