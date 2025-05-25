import {UserSex} from '../user';

export interface UserDto {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  userSex: UserSex;
}
