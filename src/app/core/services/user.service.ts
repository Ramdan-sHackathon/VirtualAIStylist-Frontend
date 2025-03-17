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
    return this._HttpClient.post<any>(`http://virtualaistylist.runasp.net/api/Account/Register`, user);
  }
}
