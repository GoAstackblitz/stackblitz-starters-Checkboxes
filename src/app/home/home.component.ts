import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) {}

  basicForm = this.fb.group({
    textInput: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(new RegExp(/^\+?[\d-() ]{10,18}$/)),
      ],
    ],
    textarea: ['', [Validators.required, Validators.maxLength(200)]],
    moreInput: ['no'],
  });

  isModalOpen = false;
  isShowContainer = false;
  showProgress = false;
  checkbox1Checked = false;
  checkbox3Checked = false;
  reactiveFormCtrl = new FormControl();
  testFormCtrl = new FormControl('checked');
  test1FormCtrl = new FormControl();
  errors: { [key: string]: string } = {};

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onChange() {
    this.checkbox1Checked = !this.checkbox1Checked;
  }

  showContainer() {
    if (this.basicForm.controls['moreInput'].value == 'yes') {
      this.isShowContainer = true;
    } else {
      this.isShowContainer = false;
    }
  }

  removeContainer() {
    this.isShowContainer = false;
    this.basicForm.controls['moreInput'].setValue('no');
    this.isModalOpen = false;
  }

  getErrorMessage(name: string): string {
    if (this.basicForm.get(name)?.hasError('required')) {
      return 'Required';
    } else {
      switch (name) {
        case 'email':
          if (this.basicForm.get('email')?.hasError('email')) {
            return 'Invalid email address';
          }
          break;
        case 'phone':
          if (this.basicForm.get('phone')?.hasError('pattern')) {
            return 'Invalid phone number';
          }
          break;
        case 'textarea':
          if (this.basicForm.get('textarea')?.hasError('maxlength')) {
            return 'Must be less than 200 characters';
          }
          break;
        default:
          return '';
      }
    }

    return '';
  }

  onSubmit() {
    Object.keys(this.basicForm.controls).forEach((control) => {
      this.errors[control] = this.getErrorMessage(control);
    });
    if (this.basicForm.valid) {
      this.showProgress = true;
      setTimeout(() => {
        this.showProgress = false;
        this.router.navigate(['/basic-form-success']);
      }, 2000);
    }
  }

  onCancel() {
    this.location.back();
  }
  onChange3() {
    this.checkbox3Checked = !this.checkbox3Checked;
  }
}
