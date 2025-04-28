import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ControlsOf, IProfile } from '@shared';
import { UserProfile } from '../interface';
import { UserProfileService } from '../user-profile.service';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { Router } from '@angular/router';
import { AuthService, User } from '@core';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MtxButtonModule,
  ],
})
export class ProfileSettingsComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly userProfileService = inject(UserProfileService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  toast = inject(ToastrService);

  isSubmitting = false;

  user!: User;
  userProfile = {};

  reactiveForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    company: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    socialMedia: ['', []],
    dateOfBirth: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.authService.user()
      .pipe(switchMap(user => {
        this.user = user;
        return this.userProfileService.get(user.username || '');
      })).subscribe({
        next: (userProfile) => {
          console.log('user profile ', userProfile)
          this.reactiveForm.patchValue({
            username: this.user.username,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email,
            gender: userProfile.gender,
            city: userProfile.city,
            address: userProfile.address,
            company: userProfile.company,
            phone: userProfile.phone,
            socialMedia: userProfile.socialMedia,
            dateOfBirth: userProfile.dateOfBirth,
          });
        },
        error: () => {
          this.toast.error('Unable to fetch user profile!');
        }
      })
  }


  getErrorMessage(form: any) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  cancel() {

  }

  onSubmit() {
    if (this.reactiveForm.invalid) {
      return;
    }
    this.isSubmitting = true;

    this.userProfileService.update(this.user.username || '', { ...this.reactiveForm.value })
      .subscribe({
        next: () => {
          this.toast.success('Profile Details Updated!');
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
  }
}
