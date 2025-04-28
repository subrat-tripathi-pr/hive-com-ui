import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlsOf } from '@shared';
import { Contact } from '../interface';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  imports: [FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule],
})
export class EditContactComponent {
  private readonly fb = inject(FormBuilder);
  // tags: string[] = [];

  reactiveForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    company: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    website: ['', [Validators.required]],
    tag: ['', [Validators.required]],
  });

  getErrorMessage(form: any) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const tags = this.reactiveForm.get('tags') || [];
      console.log(tags);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    console.log(tag);

    // const index = this.tags.indexOf(tag);

    // if (index >= 0) {
    //   this.tags.splice(index, 1);
    // }
  }
}
