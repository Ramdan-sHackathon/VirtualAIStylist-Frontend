import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/User";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _HttpClient: HttpClient) { }
  userRegister(user: User): Observable<any> {
    return this._HttpClient.post<any>(`${environment.baseUrl}/Account/Register`, user);
  }
  userLogin(user: User): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/Account/Login`, user);
  }
}
