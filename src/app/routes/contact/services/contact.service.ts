import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '@core';
import { Contact } from '../interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  protected readonly http = inject(HttpClient);
  protected readonly tokenService = inject(TokenService);

  fetchAllContacts() {
    const username = this.tokenService.username();
    const headers = new HttpHeaders({
      'userId': username
    });
    return this.http.get<Contact[]>('/contacts', { headers })
      .pipe(map(contacts =>
        contacts.map(contact => ({
          ...contact,
          image: contact.image || 'images/default-avatar-2.png'
        }))));
  }

  addContact(contactData: any) {
    const username = this.tokenService.username();
    const headers = new HttpHeaders({
      'userId': username
    });
    return this.http.post<Contact>('/contacts', contactData, { headers });
  }

  updateContact(contactData: any) {
    const username = this.tokenService.username();
    const headers = new HttpHeaders({
      'userId': username
    });
    return this.http.put<Contact>(`/contacts/${contactData.id}`, contactData, { headers });
  }
  
  deleteContact(contactId: string) {
    return this.http.delete(`/contacts/${contactId}`);
  }
}
