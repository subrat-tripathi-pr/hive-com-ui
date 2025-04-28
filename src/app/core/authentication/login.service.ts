import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { JwtToken, Menu } from '@core';
import { Token, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  protected readonly http = inject(HttpClient);

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<{ token: string }>('/api/auth/login', { username, password, rememberMe })
    .pipe(map(res => {
      let token:Token = {access_token: res.token};
      return token;
    }));
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/api/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/api/auth/logout', {});
  }

  user(username: any) {
    return this.http.get<User>(`/users/${username}`);
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('data/menu.json').pipe(map(res => {
      return res.menu;
    }));
  }
}
