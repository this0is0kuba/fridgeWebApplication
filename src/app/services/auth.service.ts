import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginInfo } from '../models/auth/Login';
import { RegistrationInfo } from '../models/auth/Registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8080/fridge";

  constructor(private httpClient: HttpClient) {}

  authorizeTheUser(loginInfo: LoginInfo) {

    const loginUrl: string = this.url + "/authenticateTheUser";
    
    const loginParams: HttpParams = new HttpParams()
      .set("username", loginInfo.username)
      .set("password", loginInfo.password)

    const options = {withCredentials: true, params: loginParams};

    return this.httpClient.post<string>(loginUrl, null, options);
  }

  registerTheUser(registrationInfo: RegistrationInfo) {

    const loginUrl: string = this.url + "/processRegistrationForm";
    const options = {withCredentials: true};

    return this.httpClient.post<string>(loginUrl, registrationInfo, options);
  }

  loadUserInfo() {

    const options = {withCredentials: true}

    return this.httpClient.get<string>(this.url + "/userInfo", options);
  }


}
