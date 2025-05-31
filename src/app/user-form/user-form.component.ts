import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSexSelectComponent} from '../user-sex-select/user-sex-select.component';
import {JsonPipe, NgIf} from '@angular/common';
import {UserDto} from './userDto';
import {UserFilterSelectComponent} from '../user-filter-select/user-filter-select.component';

@Component({
  selector: 'app-user-form',
  template: `
    <div class="card my-5">
      <div class="card-body">
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <label for="first-name">Imię: </label>
          <input id="first-name" type="text" formControlName="firstName"/>
          <label for="last-name">Nazwisko: </label>
          <input id="last-name" type="text" formControlName="lastName"/>
          <label for="age">Wiek: </label>
          <input id="age" type="number" formControlName="age"/>
          <user-sex-select formControlName="sex" placeholder="Wybierz płeć" label="Płeć">
          </user-sex-select>
          <div *ngIf="userForm.get('sex')?.invalid && userForm.get('sex')?.touched" class="error">
            Płeć jest wymagana
          </div>
          <user-filter-select formControlName="fatherUserId" placeholder="Wybierz ojca" label="Ojciec"></user-filter-select>
          <user-filter-select formControlName="motherUserId" placeholder="Wybierz matkę" label="Matka"></user-filter-select>
          <p>Wypełnij dane aby aktywować przycisk</p>
          <p>formularz = {{ userForm.value | json}}</p>
          <button type="submit" [disabled]="!userForm.valid">Submit</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./user-form.component.scss'],
  imports: [ReactiveFormsModule, UserSexSelectComponent, NgIf, UserFilterSelectComponent, JsonPipe]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      firstName: [''],
      lastName: [''],
      age: [null],
      sex: [null, Validators.required],
      fatherUserId: [null],
      motherUserId: [null],
    });
  }

  onSubmit() {
    const partialUser: UserDto = this.userForm.value;

    this.userService.save(partialUser).subscribe(() => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
