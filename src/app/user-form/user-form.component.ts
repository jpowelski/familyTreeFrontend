import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../user';
import {UserSexSelectComponent} from '../user-sex-select/user-sex-select.component';
import {NgIf} from '@angular/common';
import {UserDto} from './userDto';

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
          <user-sex-select formControlName="userSex" placeholder="Wybierz płeć" label="Płeć">
          </user-sex-select>
          <div *ngIf="userForm.get('userSex')?.invalid && userForm.get('userSex')?.touched" class="error">
            Płeć jest wymagana
          </div>
          <p>Wypełnij dane aby aktywować przycisk</p>
          <button type="submit" [disabled]="!userForm.valid">Submit</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./user-form.component.scss'],
  imports: [ReactiveFormsModule, UserSexSelectComponent, NgIf]
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
      id: [null], // Domyślna wartość null
      firstName: [''],
      lastName: [''],
      age: [null], // Domyślna wartość null
      userSex: [null, Validators.required],
    });
  }

  onSubmit() {
    console.warn(this.userForm.value);

    const partialUser: UserDto = this.userForm.value;

    // Bezpośrednie przypisanie, jeśli User pozwala na null
    // const userToSave: User = partialUser as User; // Asercja typu, bo wiesz, że struktura jest kompatybilna po zmianie interfejsu User
    // LUB bezpieczniej (jeśli niektóre pola są wymagane w User, a formularz je ma)
    const userToSave: User = {
      id: partialUser.id,
      firstName: partialUser.firstName, // Upewnij się, że nie jest null/undefined, jeśli wymagane
      lastName: partialUser.lastName,
      age: partialUser.age,
      sex: partialUser.userSex,
    }

    this.userService.save(userToSave).subscribe(() => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
