import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@shared';
import { ContactCardComponent } from "../card/contact-card.component";
import { Contact } from '../interface';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    BreadcrumbComponent,
    ContactCardComponent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ]
})
export class ListContactsComponent {
  handleContactSelection($event: Event) {
    throw new Error('Method not implemented.');
  }

  private readonly contactService = inject(ContactService);
  private readonly router = inject(Router);
  contacts!: Contact[];
  searchText: string = '';

  ngOnInit(): void {
    this.contactService.fetchAllContacts()
      .subscribe(contactDetails => this.contacts = contactDetails);
  }

  addContact() {
    this.router.navigateByUrl('/contact/add');
  }

  edit(contactId: string) {
    const contact = this.contacts.find(contactDetail => contactDetail.id === contactId);
    this.router.navigate(['/contact/add'], { state: { contact } });
  }

  get filteredContacts(): Contact[] {
    if (!this.searchText) {
      return this.contacts;
    }

    const lowerSearch = this.searchText.toLowerCase();

    return this.contacts.filter(contact =>
      Object.values(contact).some(value =>
        value && value.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }

}
