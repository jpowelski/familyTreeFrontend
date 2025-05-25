import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="card my-5">
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Imię</th>
            <th scope="col">Nazwisko</th>
            <th scope="col">Wiek</th>
            <th scope="col">Płeć</th>
            <th scope="col">Dzieci</th>
          </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.age }}</td>
                <td>{{ user.sex }}</td>
                <td>
                  @for (child of user.children; track child.id) {
                    {{ child.id + ' ' + child.firstName + ' ' + child.lastName + ' ' + child.age + ' |' }}
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>`,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}
