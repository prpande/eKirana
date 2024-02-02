import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/user/models/user';

@Component({
  selector: 'app-id-form',
  templateUrl: './id-form.component.html',
  styleUrls: ['./id-form.component.css']
})
export class IdFormComponent implements OnInit {
  @Input()
  userInfo!: User;

  userIdGroup!: FormGroup;
  get panCardNumber() { return this.userIdGroup.get("panCardNumber"); }
  get gstNumber() { return this.userIdGroup.get("gstNumber"); }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userIdGroup = this.fb.group({
      panCardNumber: ['', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      gstNumber: ['', [Validators.required,
      Validators.minLength(15),
      Validators.maxLength(15),
      Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]]
    })

    if (this.userInfo.userId) {
      this.panCardNumber?.setValue(this.userInfo.panCardNumber);
      this.gstNumber?.setValue(this.userInfo.gstIdNumber);
    }
  }
}
