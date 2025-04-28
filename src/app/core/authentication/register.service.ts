import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  protected readonly http = inject(HttpClient);

  register(payload:any): Observable<any> {
    return this.http.post('/api/auth/register', payload);
  }
}
