import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {UserDto} from './user-form/userDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public findAllFiltered(): Observable<User[]> {
    return this.http.post<User[]>(this.usersUrl + "/filter", {});
  }

  public save(user: UserDto): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }
}
