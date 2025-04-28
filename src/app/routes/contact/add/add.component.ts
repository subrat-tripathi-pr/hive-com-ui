import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { Contact } from '../interface';
import { ContactService } from '../services/contact.service';
import { BreadcrumbComponent } from '@shared';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  imports: [FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MtxButtonModule,
    BreadcrumbComponent],
})
export class AddContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly router = inject(Router);
  isEditMode: boolean = false;
  contactId!: string | null | undefined;
  contact!: Contact;
  isSubmitting = false;
  addOnBlur = true;
  tags: string[] = [];

  reactiveForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', []],
    city: ['', [Validators.required]],
    address: ['', []],
    zipCode: ['', [Validators.required]],
    company: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    website: ['', []],
  });

  ngOnInit(): void {
    const contactDetails = history.state.contact;
    if (contactDetails) {
      this.contact = contactDetails;
      this.isEditMode = true;
      this.contactId = this.contact.id;
      this.tags = this.contact.tags || [];
      this.reactiveForm.patchValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email,
        gender: this.contact.gender,
        city: this.contact.city,
        address: this.contact.address,
        zipCode: this.contact.zipCode,
        company: this.contact.company,
        phone: this.contact.phone,
        website: this.contact.website,
      });
    }
  }

  getErrorMessage(form: any) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const input = event.chipInput.inputElement;
    const value = event.value;
    // Add our person
    if ((value || '').trim()) {
      const tagName = value.trim();
      this.tags.push( tagName );
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove person if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing person
    const index = this.tags.indexOf(tag);
    if (index > 0) {
      this.tags[index] = value;
    }
  }

  onSubmit(): void {
    if (this.reactiveForm.invalid) {
      return;
    }
    this.isSubmitting = true;

    const contactData = this.reactiveForm.value;
    if (this.isEditMode) {
      this.contactService.updateContact({ ...contactData, id: this.contactId, tags: this.tags }).subscribe({
        next: () => {
          this.router.navigate(['/contact/list']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.contactService.addContact({ ...contactData, tags: this.tags }).subscribe({
        next: () => {
          this.router.navigate(['/contact/list']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/contact/list']);
  }
}
