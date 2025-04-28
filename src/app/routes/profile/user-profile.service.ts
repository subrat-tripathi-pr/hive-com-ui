import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserProfile } from './interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  protected readonly http = inject(HttpClient);

  update(userId: string, userProfile: any) {
    console.log('user profile in service', userProfile, userId);
    return this.http.put<UserProfile>(`/user/${userId}/profile`, { userProfile });
  }

  get(userId: string) {
    return this.http.get<UserProfile>(`/user/${userId}/profile`);
  }
}
