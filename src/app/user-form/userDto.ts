import {UserSex} from '../user';

export interface UserDto {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  userSex: UserSex;
  fatherUserId?: number;
  motherUserId?: number;
}
